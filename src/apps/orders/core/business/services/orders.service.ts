import { BaseService } from '@nodesandbox/repo-framework';
import { ErrorResponse } from '@nodesandbox/response-kit';
import { IOrderModel, orderModel } from '../../domain';
import { OrdersRepository } from '../repository';

class OrdersService extends BaseService<IOrderModel, OrdersRepository> {
  constructor() {
    const orderRepo = new OrdersRepository(orderModel);
    super(orderRepo, {
      filter: {
        allowedFields: ['user', 'status', 'totalAmount', 'shoppingAddress'],
        defaultSort: { createdAt: -1 },
      },
      search: {
        enabled: true,
        fields: ['user', 'totalAmount', 'shoppingAddress', 'status'],
        caseSensitive: false,
        fuzzySearch: false,
      },
      populate: {
        fields: [{ path: 'user', select: '_id firstname email phone' }],
        defaultPopulate: true,
      },
    });
  }

  async getOrders(filters: any) {
    const { page = 1, limit = 10, sort, search = '', user, order } = filters;

    const query: any = {};

    if (user) query.user = user;
    if (order) query.order = order;

    return this.findAll({
      query,
      sort: sort as Record<string, 1 | -1>,
      page: parseInt(page),
      limit: parseInt(limit),
      searchTerm: search as string,
    });
  }

  async getAllOrders(filters: any) {
    const { page = 1, limit = 10, sort, search = '' } = filters;

    return this.findAll({
      sort: sort as Record<string, 1 | -1>,
      page: parseInt(page),
      limit: parseInt(limit),
      searchTerm: search as string,
    });
  }

  async verifyOrderOwnership(orderId: string, userId: string) {
    try {
      const order = await this.repository.findById(orderId);
      console.log('🎓🎓🎓🎓🎓🎓🎓', order);

      if (order?.data.doc.user !== userId) {
        throw new ErrorResponse({
          code: 'UNAUTHORIZED',
          message: 'User is not authorized to access this order',
        });
      }

      return { success: true };
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
}

export default new OrdersService();
