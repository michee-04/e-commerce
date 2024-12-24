import Joi, { ObjectSchema } from 'joi';

export const createReviewsRequestDto: ObjectSchema = Joi.object({
  productId: Joi.string().required(),
  userId: Joi.string().required(),
  rading: Joi.number().optional(),
  Comment: Joi.string().optional(),
});
