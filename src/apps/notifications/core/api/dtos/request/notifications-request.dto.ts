import Joi, { ObjectSchema } from 'joi';

export const createNotificationsRequestDto: ObjectSchema = Joi.object({
  userId: Joi.string().required(),
  message: Joi.string().min(3).optional(),
  status: Joi.boolean().default(false),
});
