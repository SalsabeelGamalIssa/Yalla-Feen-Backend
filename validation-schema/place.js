const Joi = require('joi');

const createPlaceScehma = Joi.object().keys({
  category: Joi.string().required(),
  location: Joi.string().required(),
  title: Joi.string().required(),
  type: Joi.string().required(),
  description: Joi.string().required(),

})

module.exports = {createPlaceScehma}