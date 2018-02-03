vue-joi
=========

Create vue forms with [joi](https://www.npmjs.com/package/joi)!

Usage
------

    npm i vui-joi --save

Then

```
<template>
  <div id="app">
    <joi-editor v-bind="edit" v-on:save="saveToDB"> </joi-editor>
  </div>
</template>

<script>
import Joi from 'joi'
import JoiEditor from 'vue-joi'

const schema = Joi.object({
  first_name: Joi.number().required(),
  last_name: Joi.string().required().description('last name please'),
  cool: Joi.boolean().description('Is the user cool?'),
  style: Joi.string().valid(['a', 'b', 'c']).description('this is amazing'),
  other: Joi.object().keys({
    nice: Joi.boolean(),
    nickName: Joi.string().description('what do people call you?')
  }).description('things are are nice to know, but not important')
})

let initialValue = {
  first_name: 'Ryan'
}

export default {
  name: 'app',
  components: { JoiEditor },
  data () {
    return { edit: { schema, initialValue } }
  },
  methods: {
    saveToDB: function (data) {
      console.log('please save this', data)
    }
  }
}
</script>
```

Import note about joi in the browser
------------------------------------

Please use [Joi Browser](https://github.com/jeffbski/joi-browser) and follow the instructions in the [webpack](https://github.com/jeffbski/joi-browser#webpack) section. Joi is not directly supported in the browser.

You can use this [example webpack.config.js](./webpack.config.js) to get your webpack working.
