import Joi, { ObjectSchema } from 'joi';

export const createProductRequestDto: ObjectSchema = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string().required(),
  price: Joi.string().required(),
  stockQte: Joi.number(),
  category: Joi.string().required(),
});
