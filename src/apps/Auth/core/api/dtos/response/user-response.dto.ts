import * as Joi from 'joi';

export const userResponseDto: Joi.ObjectSchema = Joi.object({
  firstname: Joi.string().min(3).required(),
  lastname: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().optional(),
  _id: Joi.any(),
  updatedBy: Joi.any(),
  createdAt: Joi.any(),
  deletedAt: Joi.any(),
  deletedBy: Joi.any(),
  createdBy: Joi.any(),
});
