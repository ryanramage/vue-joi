<template>
  <div v-if="children">
    <div v-for="child in children">
      <div v-if="child.schema.schemaType === 'string' && !child.schema._valids._set.length">
        {{child.key}}: <input v-model="initialValue[child.key]" > <span>{{child.schema._description}}</span>
      </div>
      <div v-if="child.schema.schemaType === 'string' && child.schema._valids._set.length">
        {{child.key}}:
        <select v-model="initialValue[child.key]">
          <option v-for="option in child.schema._valids._set" v-bind:value="option">
             {{ option }}
           </option>
        </select>
        <span>{{child.schema._description}}</span>
      </div>
      <div v-if="child.schema.schemaType === 'number'">
        {{child.key}}: <input v-model="initialValue[child.key]" > <span>{{child.schema._description}}</span>
      </div>
      <div v-if="child.schema.schemaType === 'boolean'">
        {{child.key}}: <input type="checkbox" id="checkbox" v-model="initialValue[child.key]"> {{initialValue[child.key]}} <span>{{child.schema._description}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
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
        children: null
      }
    },
    mounted () {
      console.log('mounted', this.schema)
      this.$set(this.$data, 'children', this.schema.children)
    }
  }
</script>


<style>

</style>
