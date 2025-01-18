import { BaseService } from '@nodesandbox/repo-framework';
import { IReviewsModel, reviewsModel } from '../../domain';
import { ReviewsRepository } from '../repository';

class ReviewsService extends BaseService<IReviewsModel, ReviewsRepository> {
  constructor() {
    const reviewsRepo = new ReviewsRepository(reviewsModel);
    super(reviewsRepo, {
      filter: {
        allowedFields: ['comment', 'rading'],
        defaultSort: { createdAt: -1 },
      },
      search: {
        enabled: true,
        fields: ['comment', 'rading'],
        caseSensitive: false,
        fuzzySearch: false,
      },
      populate: {
        fields: [
          { path: 'product', select: 'name description' },
          { path: 'user', select: 'firstname email' },
        ],
        defaultPopulate: true,
      },
    });
  }

  async getReviews(filters: any) {
    const { page = 1, limit = 10, sort, search = '' } = filters;

    return this.findAll({
      sort: sort as Record<string, 1 | -1>,
      page: parseInt(page),
      limit: parseInt(limit),
      searchTerm: search as string,
    });
  }
}

export default new ReviewsService();
