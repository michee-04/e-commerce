import { BaseService } from '@nodesandbox/repo-framework';
import { ErrorResponse } from '@nodesandbox/response-kit';
import { IProductImageModel, productImageModel } from '../../domain';
import { ProductImageRepository } from '../repository';

class ProductImageService extends BaseService<
  IProductImageModel,
  ProductImageRepository
> {
  constructor() {
    const productImageRepo = new ProductImageRepository(productImageModel);
    super(productImageRepo, {
      filter: {
        allowedFields: ['imageUrl', 'altText', 'isPrimary', 'product'],
        defaultSort: { createdAt: -1 },
      },
      search: {
        enabled: true,
        fields: ['imageUrl', 'altText'],
        caseSensitive: false,
        fuzzySearch: false,
      },
      populate: {
        fields: [
          { path: 'product', select: '_id name description' },
          { path: 'image', select: '_id type url' },
        ],
        defaultPopulate: true,
      },
    });
  }

  async getProductImage(filters: any) {
    const { page = 1, limit = 10, sort, search = '', product } = filters;

    if (product === ':productId') {
      throw new ErrorResponse({
        code: 'BAD_REQUEST',
        message: "Entrez l'identifiant du produit image",
      });
    }

    const query: any = {};

    if (product) query.product = product;

    return this.findAll({
      query,
      sort: sort as Record<string, 1 | -1>,
      page: parseInt(page),
      limit: parseInt(limit),
      searchTerm: search as string,
    });
  }
}

export default new ProductImageService();
