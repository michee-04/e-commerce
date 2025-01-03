import Joi, { ObjectSchema } from 'joi';

export const createCouponsRequestDto: ObjectSchema = Joi.object({
  code: Joi.string().min(3).required(),
  description: Joi.string().min(3),
  discountType: Joi.string(),
  discountValue: Joi.string(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
});
