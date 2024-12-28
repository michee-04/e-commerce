import Joi, { ObjectSchema } from 'joi';

export const createSuppliersRequestDto: ObjectSchema = Joi.object({
  userId: Joi.string().required(),
  contactName: Joi.string().optional(),
  addresseId: Joi.string().required(),
});
