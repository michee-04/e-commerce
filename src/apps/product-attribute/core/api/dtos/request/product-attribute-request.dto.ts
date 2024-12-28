import Joi, { ObjectSchema } from 'joi';

export const createProductAttributeReauestDto: ObjectSchema = Joi.object({
  productId: Joi.string().required(),
  attributeName: Joi.string().required(),
  attributeValue: Joi.string().required(),
});
