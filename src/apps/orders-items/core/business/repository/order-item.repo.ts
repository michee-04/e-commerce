import { BaseRepository } from '@nodesandbox/repo-framework';
import { Model } from 'mongoose';
import { IOrderItemsModel } from '../../domain';

export class OrderItemsRepository extends BaseRepository<IOrderItemsModel> {
  constructor(model: Model<IOrderItemsModel>) {
    super(model);
  }
}
