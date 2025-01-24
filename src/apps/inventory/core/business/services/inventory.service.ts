import { BaseService } from '@nodesandbox/repo-framework';
import { IIventoryModel, inventoryModel } from '../../domain';
import { InventoryRepository } from '../repository';

class InventoryService extends BaseService<
  IIventoryModel,
  InventoryRepository
> {
  constructor() {
    const inventoryRepo = new InventoryRepository(inventoryModel);
    super(inventoryRepo, {
      filter: {
        allowedFields: ['product', 'qteStock', 'supplier', 'lastRestockDate'],
        defaultSort: { createdAt: -1 },
      },
      search: {
        enabled: true,
        fields: ['product.name'],
        caseSensitive: false,
        fuzzySearch: false,
      },
      populate: {
        fields: [
          { path: 'product', select: '_id name description' },
          { path: 'supplier', select: '_id contactName' },
        ],
        defaultPopulate: true,
      },
    });
  }

  async getInventory(filters: any) {
    const { page = 1, limit = 10, sort, search = '' } = filters;

    return this.findAll({
      sort: sort as Record<string, 1 | -1>,
      page: parseInt(page),
      limit: parseInt(limit),
      searchTerm: search as string,
    });
  }
}

export default new InventoryService();
