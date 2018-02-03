var Joi = require('joi')

module.exports = Joi.object({
  first_name: Joi.number().required().label('First Name'),
  last_name: Joi.string().required().description('last name please'),

  cool: Joi.boolean().description('Is the user cool?'),
  style: Joi.string().valid(['a', 'b', 'c']).description('this is amazing'),
  other: Joi.object().keys({
    email: Joi.string().email(),
    nice: Joi.boolean(),
    nickName: Joi.string().description('what do people call you?')
  }).description('things are are nice to know, but not important')
})
