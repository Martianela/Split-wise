const Joi = require('joi');

const expanseValidationSchema = Joi.object({
  amount: Joi.number().precision(2).min(0).default(0),
  title: Joi.string().required(),
  desc: Joi.string().allow(null).optional(),
  g_id: Joi.alternatives()
    .try(Joi.number().integer().positive(), Joi.string().regex(/^\d+$/))
    .required(),
});

module.exports = { expanseValidationSchema };
