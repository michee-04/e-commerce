import { IBaseModel } from '@nodesandbox/repo-framework';
import { Document } from 'mongoose';

export interface IOrder {
  userId: string;
  totalAmount: string;
  status: string;
  shippingAddresse: string;
}

export interface IOrderModel extends IOrder, IBaseModel, Document {}
