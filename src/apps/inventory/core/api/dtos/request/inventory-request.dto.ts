import Joi, { ObjectSchema } from 'joi';

export const createInventoryRequestDto: ObjectSchema = Joi.object({
  product: Joi.string().required(),
  qteStock: Joi.number(),
  reorderLevel: Joi.number(),
  supplier: Joi.string(),
  lastRestockDate: Joi.date().required(),
});
