import { BaseRepository } from '@nodesandbox/repo-framework';
import { Model } from 'mongoose';
import { IPromotionsModel } from '../../domain';

export class PromotionsRepository extends BaseRepository<IPromotionsModel> {
  constructor(model: Model<IPromotionsModel>) {
    super(model);
  }
}
