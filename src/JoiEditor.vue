<template>
  <div v-if="joiObject">
    <joi-object v-bind="joiObject" > </joi-object>
    <div id="save">
      <button v-on:click="save">Save</button>
    </div>
  </div>
</template>

<script>
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
        joiObject: null
      }
    },
    mounted () {

      let info = {
        schema: this.schema._inner,
        initialValue: this.initialValue
      }

      this.$set(this.$data, 'joiObject', info)
    },

    beforeDestroy () {
      console.log('beforeDestroy')
    },

    methods: {
      save () {
        console.log('saved called!', this.initialValue)
        this.schema.validate(this.initialValue, {abortEarly: false}, (err, result) => {
          if (err) return console.log(err.details)
          this.$emit('save', result)
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
