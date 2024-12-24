import Joi, { ObjectSchema } from 'joi';

export const createPtomotionRequestDto: ObjectSchema = Joi.object({
  productId: Joi.string().required(),
  discountPourcentage: Joi.string(),
  startDate: Joi.date(),
  endDate: Joi.date(),
});
