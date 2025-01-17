import { BaseRepository } from '@nodesandbox/repo-framework';
import { Model } from 'mongoose';
import { ISuppliersModel } from '../../domain';

export class SuppliersRepository extends BaseRepository<ISuppliersModel> {
  constructor(model: Model<ISuppliersModel>) {
    super(model);
  }
}
