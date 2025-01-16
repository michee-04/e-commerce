import Joi, { ObjectSchema } from 'joi';

export const createOrdersItemsRequestDto: ObjectSchema = Joi.object({
  quantity: Joi.number().optional(),
  price: Joi.number().precision(2),
});

export const updateOrdersItemsRequestDto: ObjectSchema = Joi.object({
  quantity: Joi.number().optional(),
});
