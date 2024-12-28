import Joi, { ObjectSchema } from 'joi';

export const CreateCategoryRequest: ObjectSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(3).optional(),
});
