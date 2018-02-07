var Joi = require('joi')

const address = Joi.object().keys({
  label: Joi.string().description('like home, work, other'),
  line1: Joi.string(),
  line2: Joi.string(),
  city: Joi.string(),
  province: Joi.string(),
  postal: Joi.string()
})


module.exports = Joi.object({
  first_name: Joi.number().required().label('First Name'),
  last_name: Joi.string().required().description('last name please'),
  phones: Joi.array().items(Joi.number()),
  addresses: Joi.array().items(address),
  cool: Joi.boolean().description('Is the user cool?'),
  style: Joi.string().valid(['a', 'b', 'c']).description('this is amazing'),
  other: Joi.object().label('Extra Info').keys({
    email: Joi.string().email(),
    nice: Joi.boolean(),
    nickName: Joi.string().description('what do people call you?')
  }).description('things are are nice to know, but not important')
})
