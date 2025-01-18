import { IBaseModel } from '@nodesandbox/repo-framework';
import { Document } from 'mongoose';

export interface IWishlists {
  user: string;
  product: string;
}

export interface IWishlistsModel extends IWishlists, IBaseModel, Document {}
