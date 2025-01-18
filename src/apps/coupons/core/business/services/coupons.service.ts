import { BaseService } from '@nodesandbox/repo-framework';
import {
  ErrorResponse,
  ErrorResponseType,
  SuccessResponseType,
} from '@nodesandbox/response-kit';
import { couponsModel, ICOuponsModel } from '../../domain';
import { CouponsRepository } from '../repository';

class CategoryService extends BaseService<ICOuponsModel, CouponsRepository> {
  constructor() {
    const couponsRepo = new CouponsRepository(couponsModel);
    super(couponsRepo, {
      filter: {
        allowedFields: ['code', 'description', 'discountType'],
        defaultSort: { createdAt: -1 },
      },
      search: {
        enabled: true,
        fields: ['code', 'description', 'startDate', 'endDate'],
        caseSensitive: false,
        fuzzySearch: false,
      },
    });
  }

  async createCoupon(
    payload: any,
  ): Promise<SuccessResponseType<null> | ErrorResponseType> {
    try {
      const { code } = payload;

      const categoryExists = await this.repository.exists({ code: code });

      if (categoryExists) {
        throw new ErrorResponse({
          code: 'UNIQUE_FIELD_ERROR',
          message: 'a coupons code already exists with this name.',
          statusCode: 409,
        });
      }

      const couponResponse = await this.repository.create(payload);

      return {
        success: true,
        data: {
          coupon: couponResponse,
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

  async getCoupons(filters: any) {
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
