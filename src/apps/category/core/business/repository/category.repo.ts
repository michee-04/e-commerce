import { BaseRepository } from '@nodesandbox/repo-framework';
import { Model } from 'mongoose';
import { ICategoryModel } from '../../domain';

export class CategoryRepository extends BaseRepository<ICategoryModel> {
  constructor(model: Model<ICategoryModel>) {
    super(model);
  }
}
