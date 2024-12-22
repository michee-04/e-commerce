import { BaseModel, createBaseSchema } from '@nodesandbox/repo-framework';
import {
  PRODUCT_MODEL_NAME,
  REVIEWS_MODEL_NAME,
  USER_MODEL_NAME,
} from 'modules/shared/models';
import { Schema } from 'mongoose';
import { IReviewsModel } from '../types';

const reviewsSchema = createBaseSchema<IReviewsModel>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: PRODUCT_MODEL_NAME,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: USER_MODEL_NAME,
    },
    rading: {
      type: Number,
    },
    comment: {
      type: String,
    },
  },
  {
    modelName: REVIEWS_MODEL_NAME,
  },
);

const reviewsModel = new BaseModel<IReviewsModel>(
  REVIEWS_MODEL_NAME,
  reviewsSchema,
).getModel();

export { reviewsModel, reviewsSchema };
