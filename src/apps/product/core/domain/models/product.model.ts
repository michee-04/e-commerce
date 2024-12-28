import { BaseModel, createBaseSchema } from '@nodesandbox/repo-framework';
import { CATEGORY_NAME_MODEL, PRODUCT_MODEL_NAME } from 'modules/shared/models';
import { Schema } from 'mongoose';
import { IProductModel } from '../types';

const productSchema = createBaseSchema<IProductModel>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Schema.Types.Decimal128,
      required: true,
    },
    stockQte: {
      type: Number,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: CATEGORY_NAME_MODEL,
      required: true,
    },
  },
  {
    modelName: PRODUCT_MODEL_NAME,
  },
);

const productModel = new BaseModel<IProductModel>(
  PRODUCT_MODEL_NAME,
  productSchema,
).getModel();

export { productModel, productSchema };
