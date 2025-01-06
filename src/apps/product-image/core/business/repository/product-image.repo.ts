import { BaseRepository } from '@nodesandbox/repo-framework';
import { Model } from 'mongoose';
import { IProductImageModel } from '../../domain';

export class ProductImageRepository extends BaseRepository<IProductImageModel> {
  constructor(model: Model<IProductImageModel>) {
    super(model);
  }
}
