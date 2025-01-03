import Joi, { ObjectSchema } from 'joi';

export const createProductRequestDto: ObjectSchema = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string().required(),
  price: Joi.number().greater(0).required(),
  stockQte: Joi.number().greater(0),
  category: Joi.string(),
});

export const updateProductRequestDto: ObjectSchema = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string().required(),
  price: Joi.number().greater(0).required(),
  stockQte: Joi.number().greater(0),
  category: Joi.string(),
});
