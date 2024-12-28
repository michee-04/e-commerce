import { IBaseModel } from '@nodesandbox/repo-framework';
import { Document } from 'mongoose';

export interface IProductImage {
  productId: string;
  imageUrl: string;
  altText: string;
  isPrimary: string;
}

export interface IProductImageModel
  extends IProductImage,
    IBaseModel,
    Document {}
