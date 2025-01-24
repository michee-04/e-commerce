import Joi, { ObjectSchema } from 'joi';

export const InventoryRequestDto: ObjectSchema = Joi.object({
  qteStock: Joi.number().required(),
  reorderLevel: Joi.number().min(10),
  lastRestockDate: Joi.date().required(),
});

export const UpdateInventoryRequestDto: ObjectSchema = Joi.object({
  qteStock: Joi.number().optional(),
  reorderLevel: Joi.number().min(10),
  lastRestockDate: Joi.date().optional(),
});
