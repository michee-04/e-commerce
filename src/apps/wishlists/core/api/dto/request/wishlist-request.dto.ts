import Joi, { ObjectSchema } from 'joi';

export const createWishlistRequestDto: ObjectSchema = Joi.object({
  userId: Joi.string().required(),
  productId: Joi.string().required(),
});
