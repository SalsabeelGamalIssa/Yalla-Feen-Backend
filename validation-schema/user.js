const Joi = require('joi');
const usernamePattern = /^[a-zA-Z0-9]+$/

const SignUpScehma = Joi.object().keys({
  email: Joi.string().email().required(),
  username:Joi.string().required().regex(usernamePattern),
  firstname:Joi.string().required(),
  lastname:Joi.string().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
  role: Joi.string().valid('user'),
  city: Joi.string().required(),
})

module.exports = {SignUpScehma}