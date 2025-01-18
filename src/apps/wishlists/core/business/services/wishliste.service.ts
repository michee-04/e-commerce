import { BaseService } from '@nodesandbox/repo-framework';
import { IWishlistsModel, wishlistsModel } from '../../domain';
import { WishListRepository } from '../repository';

class WishlistsService extends BaseService<
  IWishlistsModel,
  WishListRepository
> {
  constructor() {
    const wishlistsRepo = new WishListRepository(wishlistsModel);
    super(wishlistsRepo, {
      filter: {
        allowedFields: ['user', 'product'],
        defaultSort: { createdAt: -1 },
      },
      search: {
        enabled: true,
        fields: ['user', 'product'],
        caseSensitive: false,
        fuzzySearch: false,
      },
      populate: {
        fields: [
          { path: 'user', select: '_id firstname email' },
          { path: 'product', select: '_id name description' },
        ],
        defaultPopulate: true,
      },
    });
  }

  async getWishlists(filters: any) {
    const { page = 1, limit = 10, sort, search = '', user, product } = filters;

    const query: any = {};
    if (user) query.user = user;
    if (product) query.order = product;

    return this.findAll({
      query,
      sort: sort as Record<string, 1 | -1>,
      page: parseInt(page),
      limit: parseInt(limit),
      searchTerm: search as string,
    });
  }

  async getAllWishlists(filters: any) {
    const { page = 1, limit = 10, sort, search = '' } = filters;

    return this.findAll({
      sort: sort as Record<string, 1 | -1>,
      page: parseInt(page),
      limit: parseInt(limit),
      searchTerm: search as string,
    });
  }
}

export default new WishlistsService();
