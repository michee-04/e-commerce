import { IBaseModel } from '@nodesandbox/repo-framework';
import { Document } from 'mongoose';

export interface IAddresse {
  user: string;
  addresseLine1: string;
  addresseLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  addresseType: string;
}

export interface IAddresseModel extends IAddresse, IBaseModel, Document {}
