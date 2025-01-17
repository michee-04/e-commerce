import { BaseRepository } from '@nodesandbox/repo-framework';
import { Model } from 'mongoose';
import { IIventoryModel } from '../../domain';

export class InventoryRepository extends BaseRepository<IIventoryModel> {
  constructor(model: Model<IIventoryModel>) {
    super(model);
  }
}
