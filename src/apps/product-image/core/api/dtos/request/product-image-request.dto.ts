import Joi, { ObjectSchema } from 'joi';

export const createProductImageRequestDto: ObjectSchema = Joi.object({
  productId: Joi.string().required(),
  imageUrl: Joi.string(),
  altText: Joi.string().optional(),
  isPrimary: Joi.boolean(),
});
