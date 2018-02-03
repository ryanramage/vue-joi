<template>
  <div v-if="children">
    <div v-for="child in children">
      <div v-if="child.schema.schemaType === 'object'" class="object">
        <h4>{{child.schema._flags.label || child.key}}</h4>
        <div v-if="child.schema._description">
          <span>{{child.schema._description}}</span>
        </div>
        <joi-object
          v-bind:schema="child.info.schema"
          v-bind:initialValue="child.info.initialValue"
          v-bind:errors="errors[child.key]"
        ></joi-object>
      </div>
      <div v-else-if="child.schema.schemaType === 'array'" class="array">

      </div>
      <div v-else>
        <span class="label">{{child.schema._flags.label || child.key}}</span>
        <input v-if="child.schema.schemaType === 'boolean'" type="checkbox" id="checkbox" v-model="initialValue[child.key]">
        <input v-if="child.schema.schemaType === 'string' && !child.schema._valids._set.length" v-model="initialValue[child.key]" >
        <input v-if="child.schema.schemaType === 'number'" v-model="initialValue[child.key]" >
        <select v-if="child.schema.schemaType === 'string' && child.schema._valids._set.length" v-model="initialValue[child.key]">
          <option v-for="option in child.schema._valids._set" v-bind:value="option">
             {{ option }}
           </option>
        </select>
        <span v-if="child.schema._flags.presence === 'required'" class="required">*</span>
        <span class="description">{{child.schema._description}}</span>
        <div v-if="errors && errors[child.key]" class="errors">
          {{errors[child.key].message}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'JoiObject',
    props: {
      schema: {
        type: Object,
        required: true
      },
      initialValue: {
        type: Object,
        required: true
      },
      errors: { type: Object }
    },
    data () {
      return {
        children: null
      }
    },
    mounted () {
      this.schema.children.forEach(child => {
        console.log(child)
        if (child.schema.schemaType !== 'object') return
        if (!this.initialValue[child.key]) this.initialValue[child.key] = {}
        child.info = { schema: child.schema._inner, initialValue: this.initialValue[child.key] }
      })
      this.$set(this.$data, 'children', this.schema.children)
    }
  }
</script>


<style>
  .object {
    border: 1px solid blue;
    border-radius: 4px;
    padding: 5px 3px;
  }
</style>
