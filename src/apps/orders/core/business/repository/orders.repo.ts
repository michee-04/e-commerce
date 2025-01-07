import { BaseRepository } from '@nodesandbox/repo-framework';
import { Model } from 'mongoose';
import { IOrderModel } from '../../domain';

export class OrdersRepository extends BaseRepository<IOrderModel> {
  constructor(model: Model<IOrderModel>) {
    super(model);
  }
}
