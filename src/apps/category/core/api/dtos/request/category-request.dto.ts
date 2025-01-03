import Joi, { ObjectSchema } from 'joi';

export const CreateCategoryRequestDto: ObjectSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(3).optional(),
});

export const UpdateRequestDto: ObjectSchema = Joi.object({
  name: Joi.string().min(3).max(100).optional(),
  description: Joi.string().min(3).optional(),
});
