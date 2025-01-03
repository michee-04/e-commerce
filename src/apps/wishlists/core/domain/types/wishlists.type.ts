import { IBaseModel } from '@nodesandbox/repo-framework';
import { Document } from 'mongoose';

export interface IWishlists {
  userId: string;
  productId: string;
}

export interface IWishlistsModel extends IWishlists, IBaseModel, Document {}
