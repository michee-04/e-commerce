import { IBaseModel } from '@nodesandbox/repo-framework';
import { Document } from 'mongoose';

export interface IOrderItems {
  order: string;
  product: string;
  quantity: number;
  price: string;
}

export interface IOrderItemsModel extends IOrderItems, IBaseModel, Document {}
