import { BaseRepository } from '@nodesandbox/repo-framework';
import { Model } from 'mongoose';
import { ICOuponsModel } from '../../domain';

export class CouponsRepository extends BaseRepository<ICOuponsModel> {
  constructor(model: Model<ICOuponsModel>) {
    super(model);
  }
}
