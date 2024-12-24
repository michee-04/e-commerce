import { BaseModel, createBaseSchema } from '@nodesandbox/repo-framework';
import {
  PRODUCT_MODEL_NAME,
  PROMOTIONS_MODEL_NAME,
} from 'modules/shared/models';
import { Schema } from 'mongoose';
import { IPromotionsModel } from '../types';

const promotionsSchema = createBaseSchema<IPromotionsModel>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: PRODUCT_MODEL_NAME,
      required: true,
    },
    discountPourcentage: {
      type: Schema.Types.Decimal128,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  {
    modelName: PROMOTIONS_MODEL_NAME,
  },
);

const promotionsModel = new BaseModel<IPromotionsModel>(
  PROMOTIONS_MODEL_NAME,
  promotionsSchema,
).getModel();

export { promotionsModel, promotionsSchema };
