const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string()
    .required()
    .message({ "any.required": "missing required name field" }),
  email: Joi.string()
    .email()
    .required()
    .message({ "any.required": "missing required email field" }),
  phone: Joi.number()
    .required()
    .message({ "any.required": "missing required phone field" }),
});

module.exports = { addSchema };
