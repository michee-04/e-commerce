import { BaseModel, createBaseSchema } from '@nodesandbox/repo-framework';
import { ORDER_MODEL_NAME, USER_MODEL_NAME } from 'modules/shared/models';
import { Schema } from 'mongoose';
import { IOrderModel } from '../types';

const orderSchema = createBaseSchema<IOrderModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: USER_MODEL_NAME,
      rquired: true,
    },
    totalAmount: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['processing', 'shipped', 'delivered', 'cancelled'],
      default: 'processing',
    },
    shoppingAddress: {
      type: String,
    },
  },
  {
    modelName: ORDER_MODEL_NAME,
  },
);

const orderModel = new BaseModel<IOrderModel>(
  ORDER_MODEL_NAME,
  orderSchema,
).getModel();

export { orderModel, orderSchema };
