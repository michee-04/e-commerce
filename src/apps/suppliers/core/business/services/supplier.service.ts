import { BaseService } from '@nodesandbox/repo-framework';
import { ISuppliersModel, suppliersModel } from '../../domain';
import { SuppliersRepository } from '../repository';

class SuppliersService extends BaseService<
  ISuppliersModel,
  SuppliersRepository
> {
  constructor() {
    const suppliersRepo = new SuppliersRepository(suppliersModel);
    super(suppliersRepo, {
      filter: {
        allowedFields: ['user', 'contactName'],
        defaultSort: { createdAt: -1 },
      },
      search: {
        enabled: true,
        fields: ['user', 'contactName'],
        caseSensitive: false,
        fuzzySearch: false,
      },
      populate: {
        fields: [{ path: 'user', select: '_id firstname email' }],
        defaultPopulate: true,
      },
    });
  }

  async getSuppliers(filters: any) {
    const { page = 1, limit = 10, sort, search = '' } = filters;

    return this.findAll({
      sort: sort as Record<string, 1 | -1>,
      page: parseInt(page),
      limit: parseInt(limit),
      searchTerm: search as string,
    });
  }
}

export default new SuppliersService();
