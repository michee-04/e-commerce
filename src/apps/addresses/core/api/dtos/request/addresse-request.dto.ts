import Joi, { ObjectSchema } from 'joi';

export const AddresseRequestDto: ObjectSchema = Joi.object({
  addresseLine1: Joi.string().optional(),
  addresseLine2: Joi.string().optional(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  postalCode: Joi.string().optional(),
  country: Joi.string().required(),
  addresseType: Joi.string().valid('billing', 'shipping').required(),
});
