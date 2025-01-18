import { IBaseModel } from '@nodesandbox/repo-framework';
import { Document } from 'mongoose';

export interface IPromotions {
  product: string;
  discountPourcentage: any;
  startDate: Date;
  endDate: Date;
}

export interface IPromotionsModel extends IPromotions, IBaseModel, Document {}
