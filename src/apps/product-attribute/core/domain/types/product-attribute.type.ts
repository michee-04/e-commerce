import { IBaseModel } from '@nodesandbox/repo-framework';
import { Document } from 'mongoose';

export interface IProductAttribute {
  product: string;
  attributeName: string;
  attributeValue: string;
}

export interface IProductAttributeModel
  extends IProductAttribute,
    IBaseModel,
    Document {}
