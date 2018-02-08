<template>
  <div>
    <ul v-if="childSchema">
      <li v-for="(item, index) in initialValue">
        <div v-if="childSchema.schemaType === 'string' || childSchema.schemaType === 'number'">
          <span>{{item}}</span> <button v-on:click="remove(index)">x</button>
        </div>
        <div v-if="errors && errors[index]" class="errors">
          {{errors[index].message}}
        </div>
      </li>
      <li>
        <div v-if="childSchema.schemaType === 'object'">
          <div v-if="tempInput">
            <joi-object
              v-bind:schema="childSchema._inner"
              v-bind:initialValue="tempInput"
            ></joi-object>
          </div>
          <div v-else>
            <button v-on:click="add">Add {{singularName}}</button>
          </div>
        </div>
        <div v-else>
          <input v-if="childSchema.schemaType === 'string' && !childSchema._valids._set.length"  v-model="tempInput" />
          <input v-if="childSchema.schemaType === 'number'" v-model="tempInput" />
          <select v-if="childSchema.schemaType === 'string' && childSchema._valids._set.length" v-model="tempInput" />
            <option v-for="option in childSchema._valids._set">
               {{ option }}
             </option>
          </select>
          <button v-on:click="add">Add {{singularName}}</button>

        </div>
        <div v-if="tempError" class="errors">{{tempError.message}}</div>

      </li>
    </ul>
  </div>
</template>

<script>
  import JoiObject from './JoiObject.vue'
  import pluralize from 'pluralize'

  export default {
    name: 'joi-array',
    components: { JoiObject },
    props: {
      schema: {
        type: Object
      },
      initialValue: {
        type: Array
      },
      name: {
        type: String
      },
      errors: { type: Array }
    },
    data () {
      return {
        children: null,
        childSchema: null,
        singularName: name,
        tempInput: null,
        tempError: null
      }
    },
    mounted () {
      this.$set(this.$data, 'singularName', pluralize.singular(this.name))
      this.$set(this.$data, 'childSchema', this.schema.items[0])
    },
    beforeCreate: function () {
      this.$options.components.JoiObject = require('./JoiObject.vue')
    },
    methods: {
      remove (index) {
        this.initialValue.splice(index, 1)
      },
      add () {
        if (this.childSchema.schemaType === 'object') {
          if (!this.tempInput) {
           this.$set(this.$data, 'tempInput', {})
           console.log("ADDDADD", this.tempInput, this.childSchema)
          }
        } else {
          this.childSchema.validate(this.tempInput, (err, resp) => {
            if (err) return this.$set(this.$data, 'tempError', err)

            this.$set(this.$data, 'tempError', null)
            this.initialValue.push(this.tempInput)
            this.$set(this.$data, 'tempInput', null)

          })
        }
      }
    }
  }
</script>

<style>

</style>
