import Joi, { ObjectSchema } from 'joi';

export const createProductAttributeReauestDto: ObjectSchema = Joi.object({
  product: Joi.string().required(),
  attributeName: Joi.string().max(100).required(),
  attributeValue: Joi.string().max(100).required(),
});

export const updateProductAttributeReauestDto: ObjectSchema = Joi.object({
  product: Joi.string().required(),
  attributeName: Joi.string().max(100).required(),
  attributeValue: Joi.string().max(100).required(),
});
