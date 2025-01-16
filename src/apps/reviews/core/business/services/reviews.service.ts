import { BaseService } from '@nodesandbox/repo-framework';
import { IReviewsModel, reviewsModel } from '../../domain';
import { ReviewsRepository } from '../repository';

class ReviewsService extends BaseService<IReviewsModel, ReviewsRepository> {
  constructor() {
    const reviewsRepo = new ReviewsRepository(reviewsModel);
    super(reviewsRepo, {
      filter: {
        allowedFields: ['product', 'rading', 'comment'],
        defaultSort: { createdAt: -1 },
      },
      search: {
        enabled: true,
        fields: ['product', 'rading', 'comment', 'user'],
        caseSensitive: false,
        fuzzySearch: false,
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
