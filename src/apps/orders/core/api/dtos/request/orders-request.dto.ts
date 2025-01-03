import Joi, { ObjectSchema } from 'joi';

export const createOrdersRequestDto: ObjectSchema = Joi.object({
  userId: Joi.string().required(),
  totalAmount: Joi.string().required(),
  status: Joi.string()
    .valid('processing', 'shipped', 'delivered', 'cancelled')
    .default('processing'),
  shoppingAddress: Joi.string().optional(),
});
