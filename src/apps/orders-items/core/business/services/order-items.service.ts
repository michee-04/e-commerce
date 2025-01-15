import { BaseService } from '@nodesandbox/repo-framework';
import { IOrderItemsModel, orderItemsModel } from '../../domain';
import { OrderItemsRepository } from '../repository';

class OrderItemsService extends BaseService<
  IOrderItemsModel,
  OrderItemsRepository
> {
  constructor() {
    const orderItemsRepo = new OrderItemsRepository(orderItemsModel);
    super(orderItemsRepo, {
      filter: {
        allowedFields: ['order', 'product', 'quantity', 'price'],
        defaultSort: { createdAt: -1 },
      },
      search: {
        enabled: true,
        fields: ['order', 'product', 'quantity', 'price'],
        caseSensitive: false,
        fuzzySearch: false,
      },
      populate: {
        fields: [
          { path: 'order', select: '_id firstname email phone' },
          { path: 'product', select: '_id user totalAmount status' },
        ],
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
}

export default new OrderItemsService();
