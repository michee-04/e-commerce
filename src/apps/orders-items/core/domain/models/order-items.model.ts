import { BaseModel, createBaseSchema } from '@nodesandbox/repo-framework';
import {
  ORDERITEMS_MODEL_NAME,
  PRODUCT_MODEL_NAME,
  USER_MODEL_NAME,
} from 'modules/shared/models';
import { Schema } from 'mongoose';
import { IOrderItemsModel } from '../types';

const orderItemsSchema = createBaseSchema<IOrderItemsModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: USER_MODEL_NAME,
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: PRODUCT_MODEL_NAME,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Schema.Types.Decimal128,
      required: true,
    },
  },
  {
    modelName: ORDERITEMS_MODEL_NAME,
  },
);

const orderItemsModel = new BaseModel<IOrderItemsModel>(
  ORDERITEMS_MODEL_NAME,
  orderItemsSchema,
).getModel();

export { orderItemsModel, orderItemsSchema };
