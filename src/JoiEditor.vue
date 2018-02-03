<template>
  <div v-if="joiObject.schema">
    <joi-object v-bind="joiObject" > </joi-object>
    <div id="save">
      <button v-on:click="save">Save</button>
    </div>
  </div>
</template>

<script>
  const set = require('lodash.set')
  const JoiObject = require('./JoiObject.vue')

  export default {
    components: { JoiObject },
    props: {
      schema: {
        type: Object,
        required: true
      },
      initialValue: {
        type: Object
      }
    },
    data () {
      return {
        joiObject: {
          schema: null,
          initialValue: null,
          errors: []
        }
      }
    },
    mounted () {

      let info = {
        schema: this.schema._inner,
        initialValue: this.initialValue,
        errors: {}
      }

      this.$set(this.$data, 'joiObject', info)
    },

    beforeDestroy () {
      console.log('beforeDestroy')
    },

    methods: {
      save () {
        this.schema.validate(this.initialValue, {abortEarly: false}, (err, result) => {
          if (err) {
            // clear errors by key
            Object.keys(this.$data.joiObject.errors).forEach(key => this.$set(this.$data.joiObject.errors, key, null))

            // set errors by key
            let reformattedErrors = {}
            err.details.forEach(e => set(reformattedErrors, e.path.join('.'), e))
            Object.keys(reformattedErrors).forEach(key => this.$set(this.$data.joiObject.errors, key, reformattedErrors[key]))
          }
          else this.$emit('save', result)
        })
      }
    }
  }
</script>


<style>
  .VideoBg {
    position: relative;
    background-size: cover;
    background-position: center;
    overflow: hidden;
  }

  .VideoBg video {
    position: absolute;
    top: 50%;
    left: 50%;
    visibility: hidden;
    transform: translate(-50%, -50%);
  }

  .VideoBg__content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
