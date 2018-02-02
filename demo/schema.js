var Joi = require('joi')

module.exports = Joi.object({
  first_name: Joi.number().required(),
  cool: Joi.boolean().description('Is the user cool?'),
  style: Joi.string().valid(['a', 'b', 'c']).description('this is amazing')
})
