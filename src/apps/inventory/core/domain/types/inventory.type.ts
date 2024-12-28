import { IBaseModel } from '@nodesandbox/repo-framework';
import { Document } from 'mongoose';

export interface IIventory {
  product: string;
  qteStock: number;
  reoderLevel: number;
  supplier: string;
  lastRestockDate: Date;
}

export interface IIventoryModel extends IIventory, IBaseModel, Document {}
