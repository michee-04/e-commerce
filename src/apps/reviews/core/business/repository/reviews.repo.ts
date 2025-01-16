import { BaseRepository } from '@nodesandbox/repo-framework';
import { Model } from 'mongoose';
import { IReviewsModel } from '../../domain';

export class ReviewsRepository extends BaseRepository<IReviewsModel> {
  constructor(model: Model<IReviewsModel>) {
    super(model);
  }
}
