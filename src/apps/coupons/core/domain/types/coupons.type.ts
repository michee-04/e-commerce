import { IBaseModel } from '@nodesandbox/repo-framework';
import { Document } from 'mongoose';

export interface ICoupons {
  code: string;
  description: string;
  discountType: string;
  discountValue: string;
  startDate: Date;
  endDate: Date;
}

export interface ICOuponsModel extends ICoupons, IBaseModel, Document {}
