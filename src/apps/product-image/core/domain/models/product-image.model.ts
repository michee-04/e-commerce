import { BaseModel, createBaseSchema } from '@nodesandbox/repo-framework';
import {
  PRODUCT_MODEL_NAME,
  PRODUCTIMAGE_MODEL_NAME,
} from 'modules/shared/models';
import { Schema } from 'mongoose';
import { IProductImageModel } from '../types';

const productImageSchema = createBaseSchema<IProductImageModel>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: PRODUCT_MODEL_NAME,
      // required: true,
    },
    imageUrl: {
      type: String,
    },
    altText: {
      type: String,
    },
    isPrimary: {
      type: Boolean,
    },
  },
  {
    modelName: PRODUCTIMAGE_MODEL_NAME,
  },
);

const productImageModel = new BaseModel<IProductImageModel>(
  PRODUCTIMAGE_MODEL_NAME,
  productImageSchema,
).getModel();

export { productImageModel, productImageSchema };
