import Joi, { ObjectSchema } from 'joi';

export const ProductImageRequestDto: ObjectSchema = Joi.object({
  altText: Joi.string().optional(),
  isPrimary: Joi.boolean(),
});
