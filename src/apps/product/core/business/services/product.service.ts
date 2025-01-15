import { BaseService } from '@nodesandbox/repo-framework';
import {
  ErrorResponse,
  ErrorResponseType,
  SuccessResponseType,
} from '@nodesandbox/response-kit';
import { IProductModel, productModel } from '../../domain';
import { ProductRepository } from '../repository';

class ProductService extends BaseService<IProductModel, ProductRepository> {
  constructor() {
    const productRepo = new ProductRepository(productModel);
    super(productRepo, {
      filter: {
        allowedFields: ['name', 'description', 'category'],
        defaultSort: { createdAt: -1 },
      },
      search: {
        enabled: true,
        fields: ['name', 'description', 'price'],
        caseSensitive: false,
        fuzzySearch: false,
      },
      populate: {
        fields: [{ path: 'category', select: '_id name description' }],
        defaultPopulate: true,
      },
    });
  }

  async createProduct(
    payload: any,
  ): Promise<SuccessResponseType<null> | ErrorResponseType> {
    try {
      const { name } = payload;

      const productExists = await this.repository.exists({ name: name });

      if (productExists === true) {
        throw new ErrorResponse({
          code: 'UNIQUE_FIELD_ERROR',
          message:
            'A product with the same name already exists in this category.',
          statusCode: 409,
        });
      }

      const productResponse = await this.repository.create(payload);

      return {
        success: true,
        data: {
          product: productResponse,
        },
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof ErrorResponse
            ? error
            : new ErrorResponse({
                code: 'INTERNAL_SERVER_ERROR',
                message: (error as Error).message,
                statusCode: 500,
              }),
      };
    }
  }

  async getProduct(filters: any) {
    const { page = 1, limit = 10, sort, search = '' } = filters;

    return this.findAll({
      sort: sort as Record<string, 1 | -1>,
      page: parseInt(page),
      limit: parseInt(limit),
      searchTerm: search as string,
    });
  }
}

export default new ProductService();
