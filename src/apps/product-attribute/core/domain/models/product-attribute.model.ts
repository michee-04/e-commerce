import { BaseModel, createBaseSchema } from '@nodesandbox/repo-framework';
import {
  PRODUCT_MODEL_NAME,
  PRODUCTATTRIBUTE_MODEL_NAME,
} from 'modules/shared/models';
import { IProductAttributeModel } from '../types';

const productAttributeSchema = createBaseSchema<IProductAttributeModel>(
  {
    product: {
      type: String,
      ref: PRODUCT_MODEL_NAME,
      // required: true,
    },
    attributeName: {
      type: String,
      required: true,
    },
    attributeValue: {
      type: String,
      required: true,
    },
  },
  {
    modelName: PRODUCTATTRIBUTE_MODEL_NAME,
  },
);

const productAttributeModel = new BaseModel<IProductAttributeModel>(
  PRODUCTATTRIBUTE_MODEL_NAME,
  productAttributeSchema,
).getModel();

export { productAttributeModel, productAttributeSchema };
