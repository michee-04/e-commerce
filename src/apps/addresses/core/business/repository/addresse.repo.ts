import { BaseRepository } from '@nodesandbox/repo-framework';
import { Model } from 'mongoose';
import { IAddresseModel } from '../../domain';

export class AddresseRepository extends BaseRepository<IAddresseModel> {
  constructor(model: Model<IAddresseModel>) {
    super(model);
  }
}
