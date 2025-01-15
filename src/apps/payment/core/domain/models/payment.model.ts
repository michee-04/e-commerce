import { BaseModel, createBaseSchema } from '@nodesandbox/repo-framework';
import {
  ORDER_MODEL_NAME,
  PAYMENT_MODEL_NAME,
  TRANSACTIO_MODEL_NAME,
} from 'modules/shared/constants';
import { Schema } from 'mongoose';
import { IPaymentModel } from '../types';

const paymentSchema = createBaseSchema<IPaymentModel>(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: ORDER_MODEL_NAME,
      required: true,
    },
    amount: {
      type: Schema.Types.Decimal128,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ['credit_card', 'paypal', 'bank_tranfer'],
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    transactionId: {
      type: Schema.Types.ObjectId,
      ref: TRANSACTIO_MODEL_NAME,
      required: true,
    },
  },
  {
    modelName: PAYMENT_MODEL_NAME,
  },
);

const paymentModel = new BaseModel<IPaymentModel>(
  PAYMENT_MODEL_NAME,
  paymentSchema,
).getModel();

export { paymentModel, paymentSchema };
