import { IBaseModel } from '@nodesandbox/repo-framework';
import { Document } from 'mongoose';

export interface IReviews {
  productId: string;
  userId: string;
  rading: number;
  comment: string;
}

export interface IReviewsModel extends IReviews, IBaseModel, Document {}
