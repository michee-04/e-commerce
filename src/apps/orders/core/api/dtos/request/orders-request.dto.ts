import Joi, { ObjectSchema } from 'joi';

export const createOrdersRequestDto: ObjectSchema = Joi.object({
  totalAmount: Joi.number().precision(2).required(),
  status: Joi.string()
    .valid('processing', 'shipped', 'delivered', 'cancelled')
    .default('processing'),
  shoppingAddress: Joi.string().optional(),
});

export const updateOrdersRequestDto: ObjectSchema = Joi.object({
  status: Joi.string()
    .valid('processing', 'shipped', 'delivered', 'cancelled')
    .default('processing')
    .required(),
  shoppingAddress: Joi.string().optional(),
});
