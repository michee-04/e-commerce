import { BaseService } from '@nodesandbox/repo-framework';
import { IPromotionsModel, promotionsModel } from '../../domain';
import { PromotionsRepository } from '../repository';

class PromotionsService extends BaseService<
  IPromotionsModel,
  PromotionsRepository
> {
  constructor() {
    const promotionsRepo = new PromotionsRepository(promotionsModel);
    super(promotionsRepo, {
      filter: {
        allowedFields: [
          'product.name',
          'discountPourcentage',
          'startDate',
          'endDate',
        ],
        defaultSort: { createdAt: -1 },
      },
      search: {
        enabled: true,
        fields: ['product.name', 'discountPourcentage'],
        caseSensitive: false,
        fuzzySearch: false,
      },
      populate: {
        fields: [{ path: 'product', select: '_id name description price' }],
        defaultPopulate: true,
      },
    });
  }

  async getPromotions(filters: any) {
    const { page = 1, limit = 10, sort, search = '' } = filters;

    return this.findAll({
      sort: sort as Record<string, 1 | -1>,
      page: parseInt(page),
      limit: parseInt(limit),
      searchTerm: search as string,
    });
  }
}

export default new PromotionsService();
