import { BaseModel, createBaseSchema } from '@nodesandbox/repo-framework';
import {
  INVENTORY_MODEL_NAME,
  PRODUCT_MODEL_NAME,
  SUPPLIERS_MODEL_NAME,
} from 'modules/shared/constants';
import { Schema } from 'mongoose';
import { IIventoryModel } from '../types';

const inventorySchema = createBaseSchema<IIventoryModel>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: PRODUCT_MODEL_NAME,
      required: true,
    },
    qteStock: {
      type: Number,
      required: true,
    },
    reorderLevel: {
      type: Number,
    },
    supplier: {
      type: Schema.Types.ObjectId,
      ref: SUPPLIERS_MODEL_NAME,
      required: true,
    },
    lastRestockDate: {
      type: Date,
      reauired: true,
    },
  },
  {
    modelName: INVENTORY_MODEL_NAME,
  },
);

const inventoryModel = new BaseModel<IIventoryModel>(
  INVENTORY_MODEL_NAME,
  inventorySchema,
).getModel();

export { inventoryModel, inventorySchema };
