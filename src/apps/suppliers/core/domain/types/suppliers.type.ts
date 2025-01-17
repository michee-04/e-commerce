import { IBaseModel } from '@nodesandbox/repo-framework';
import { Document } from 'mongoose';

export interface ISuppliers {
  user: string;
  contactName: string;
  address: string;
}

export interface ISuppliersModel extends ISuppliers, IBaseModel, Document {}
