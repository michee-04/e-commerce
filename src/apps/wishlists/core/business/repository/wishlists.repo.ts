import { BaseRepository } from '@nodesandbox/repo-framework';
import { Model } from 'mongoose';
import { IWishlistsModel } from '../../domain';

export class WishListRepository extends BaseRepository<IWishlistsModel> {
  constructor(model: Model<IWishlistsModel>) {
    super(model);
  }
}
