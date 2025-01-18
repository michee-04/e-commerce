import Joi, { ObjectSchema } from 'joi';

export const CouponsRequestDto: ObjectSchema = Joi.object({
  code: Joi.string().min(3).required(),
  description: Joi.string().min(3),
  discountType: Joi.string().valid('percentage', 'fixed'),
  discountValue: Joi.number().precision(2),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
});
