import Joi, { ObjectSchema } from 'joi';

export const ReviewsRequestDto: ObjectSchema = Joi.object({
  rading: Joi.number().min(1).max(5).required(),
  comment: Joi.string().required(),
});
