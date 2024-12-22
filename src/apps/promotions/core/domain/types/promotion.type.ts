import { IBaseModel } from '@nodesandbox/repo-framework';
import { Document } from 'mongoose';

export interface IPromotions {
  productId: string;
  discountPourcentage: any;
  startDate: Date;
  endDate: Date;
}

export interface IPromotionsModel extends IPromotions, IBaseModel, Document {}
