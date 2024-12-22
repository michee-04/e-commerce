import Joi, { ObjectSchema } from 'joi';

export const createPaymentRequestDto: ObjectSchema = Joi.object({
  orderId: Joi.string().required(),
  amount: Joi.string().required(),
  paymentMethod: Joi.string().valid('credit_card', 'paypal', 'bank_tranfer'),
  status: Joi.string()
    .valid('pending', 'completed', 'failed')
    .default('pending'),
  transactionId: Joi.string().required(),
});
