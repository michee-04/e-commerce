import { BaseModel, createBaseSchema } from '@nodesandbox/repo-framework';
import {
  ORDER_MODEL_NAME,
  ORDERITEMS_MODEL_NAME,
  PRODUCT_MODEL_NAME,
} from 'modules/shared/constants';
import { Schema } from 'mongoose';
import { IOrderItemsModel } from '../types';

const orderItemsSchema = createBaseSchema<IOrderItemsModel>(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: ORDER_MODEL_NAME,
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: PRODUCT_MODEL_NAME,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: String,
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
