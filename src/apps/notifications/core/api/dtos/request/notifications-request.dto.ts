import Joi, { ObjectSchema } from 'joi';

export const NotificationsRequestDto: ObjectSchema = Joi.object({
  message: Joi.string().min(3).optional(),
  status: Joi.boolean().default(false),
});
