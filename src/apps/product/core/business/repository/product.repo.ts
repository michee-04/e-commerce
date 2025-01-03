import { BaseRepository } from '@nodesandbox/repo-framework';
import { Model } from 'mongoose';
import { IProductModel } from '../../domain';

export class ProductRepository extends BaseRepository<IProductModel> {
  constructor(model: Model<IProductModel>) {
    super(model);
  }
}
