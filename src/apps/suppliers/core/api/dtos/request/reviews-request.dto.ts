import Joi, { ObjectSchema } from 'joi';

export const SuppliersRequestDto: ObjectSchema = Joi.object({
  user: Joi.string().required(),
  contactName: Joi.string().optional(),
  address: Joi.string().optional(),
});

export const updateSuppliersRequestDto: ObjectSchema = Joi.object({
  contactName: Joi.string().optional(),
  address: Joi.string().optional(),
});
