import Joi, { ObjectSchema } from 'joi';

export const ReviewsRequestDto: ObjectSchema = Joi.object({
  rading: Joi.number().required(),
  Comment: Joi.string().required(),
});
