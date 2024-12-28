import { IBaseModel } from '@nodesandbox/repo-framework';
import { Document } from 'mongoose';

export interface IOrderItems {
  userId: string;
  productId: string;
  quantity: number;
  price: any;
}

export interface IOrderItemsModel extends IOrderItems, IBaseModel, Document {}
