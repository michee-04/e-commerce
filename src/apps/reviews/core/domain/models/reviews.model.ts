import { BaseModel, createBaseSchema } from '@nodesandbox/repo-framework';
import {
  PRODUCT_MODEL_NAME,
  REVIEWS_MODEL_NAME,
  USER_MODEL_NAME,
} from 'modules/shared/constants';
import { Schema } from 'mongoose';
import { IReviewsModel } from '../types';

const reviewsSchema = createBaseSchema<IReviewsModel>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: PRODUCT_MODEL_NAME,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: USER_MODEL_NAME,
      required: true,
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
