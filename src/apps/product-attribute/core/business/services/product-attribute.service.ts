import { BaseService } from '@nodesandbox/repo-framework';
import { IProductAttributeModel, productAttributeModel } from '../../domain';
import { ProductAttributeRepository } from '../repository';

class ProductAttributeService extends BaseService<
  IProductAttributeModel,
  ProductAttributeRepository
> {
  constructor() {
    const productAttributeRepo = new ProductAttributeRepository(
      productAttributeModel,
    );
    super(productAttributeRepo, {
      filter: {
        allowedFields: ['attributeName', 'attributeValue'],
        defaultSort: { createdAt: -1 },
      },
      search: {
        enabled: true,
        fields: ['attributeName', 'attributeValue'],
        caseSensitive: false,
        fuzzySearch: false,
      },
      populate: {
        fields: [{ path: 'product', select: '_id name description' }],
        defaultPopulate: true,
      },
    });
  }

  async getProductAttribute(filters: any) {
    const { page = 1, limit = 10, sort, search = '' } = filters;

    return this.findAll({
      sort: sort as Record<string, 1 | -1>,
      page: parseInt(page),
      limit: parseInt(limit),
      searchTerm: search as string,
    });
  }
}

export default new ProductAttributeService();
