import { IBaseModel } from '@nodesandbox/repo-framework';
import { Document } from 'mongoose';

export interface IProductImage {
  product: string;
  imageUrl: string;
  altText: string;
  isPrimary: string;
}

export interface IProductImageModel
  extends IProductImage,
    IBaseModel,
    Document {}
