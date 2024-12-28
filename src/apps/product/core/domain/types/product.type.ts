import { IBaseModel } from '@nodesandbox/repo-framework';
import { Document } from 'mongoose';

export interface IProduct {
  name: string;
  description: string;
  price: any;
  stockQte: number;
  category: string;
}

export interface IProductModel extends IProduct, IBaseModel, Document {}
