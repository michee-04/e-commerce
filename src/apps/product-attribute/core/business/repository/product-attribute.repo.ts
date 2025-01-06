import { BaseRepository } from '@nodesandbox/repo-framework';
import { Model } from 'mongoose';
import { IProductAttributeModel } from '../../domain';

export class ProductAttributeRepository extends BaseRepository<IProductAttributeModel> {
  constructor(model: Model<IProductAttributeModel>) {
    super(model);
  }
}
