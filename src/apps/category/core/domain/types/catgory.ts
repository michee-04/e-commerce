import { IBaseModel } from '@nodesandbox/repo-framework';
import { Document } from 'mongoose';

export interface ICategory {
  name: string;
  description: string;
  image: any;
}

export interface ICategoryModel extends ICategory, IBaseModel, Document {}
