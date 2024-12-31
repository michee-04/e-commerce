import { BaseService } from '@nodesandbox/repo-framework';
import {
  ErrorResponse,
  ErrorResponseType,
  SuccessResponseType,
} from '@nodesandbox/repo-framework/dist/handlers';
import { categoryModel, ICategoryModel } from '../../domain';
import { CategoryRepository } from '../repository';

class CategoryService extends BaseService<ICategoryModel, CategoryRepository> {
  constructor() {
    const categoryRepo = new CategoryRepository(categoryModel);
    super(categoryRepo, {
      filter: {
        allowedFields: ['name', 'description'],
        defaultSort: { createdAt: -1 },
      },
      search: {
        enabled: true,
        fields: ['name', 'description'],
        caseSensitive: false,
        fuzzySearch: false,
      },
    });
  }

  async createCategory(
    payload: any,
  ): Promise<SuccessResponseType<null> | ErrorResponseType> {
    try {
      const { name } = payload;

      const categoryExists = await this.repository.exists({ name: name });

      if (categoryExists === true) {
        throw new ErrorResponse({
          code: 'UNIQUE_FIELD_ERROR',
          message: 'a category already exists with this name.',
          statusCode: 409,
        });
      }

      const categoryResponse = await this.repository.create(payload);

      return {
        success: true,
        data: {
          category: categoryResponse,
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

  async getCategory(filters: any) {
    const { page = 1, limit = 10, sort, search = '' } = filters;

    return this.findAll({
      sort: sort as Record<string, 1 | -1>,
      page: parseInt(page),
      limit: parseInt(limit),
      searchTerm: search as string,
    });
  }
}

export default new CategoryService();
