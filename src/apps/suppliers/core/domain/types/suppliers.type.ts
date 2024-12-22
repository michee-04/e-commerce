import { IBaseModel } from '@nodesandbox/repo-framework';
import { Document } from 'mongoose';

export interface ISuppliers {
  userId: string;
  contactName: string;
  addressId: string;
}

export interface ISuppliersModel extends ISuppliers, IBaseModel, Document {}
