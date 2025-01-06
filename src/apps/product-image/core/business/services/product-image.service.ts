import { BaseService } from '@nodesandbox/repo-framework';
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
        allowedFields: ['product', 'imageUrl', 'altText'],
        defaultSort: { createdAt: -1 },
      },
      search: {
        enabled: true,
        fields: ['product', 'imageUrl', 'altText', 'isPrimary'],
        caseSensitive: false,
        fuzzySearch: false,
      },
      populate: {
        fields: [{ path: 'product', select: '_id name description' }],
        defaultPopulate: true,
      },
    });
  }
}

export default new ProductImageService();
