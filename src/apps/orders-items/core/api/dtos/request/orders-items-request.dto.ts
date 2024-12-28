import Joi, { ObjectSchema } from 'joi';

export const createOrdersItemsRequestDto: ObjectSchema = Joi.object({
  userId: Joi.string().required(),
  productId: Joi.string().required(),
  quantity: Joi.number().optional(),
  price: Joi.string(),
});
