import Joi, { ObjectSchema } from 'joi';

export const SuppliersRequestDto: ObjectSchema = Joi.object({
  user: Joi.string().required(),
  contactName: Joi.string().optional(),
  addresseId: Joi.string().required(),
});
