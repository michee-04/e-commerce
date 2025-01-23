import { BaseService } from '@nodesandbox/repo-framework';
import { addresseModel, IAddresseModel } from '../../domain';
import { AddresseRepository } from '../repository';

class AddresseService extends BaseService<IAddresseModel, AddresseRepository> {
  constructor() {
    const addresseRepo = new AddresseRepository(addresseModel);
    super(addresseRepo, {
      filter: {
        allowedFields: [
          'user',
          'addresseLine1',
          'addresseType',
          'city',
          'state',
        ],
        defaultSort: { createdAt: -1 },
      },
      search: {
        enabled: true,
        fields: [
          'addresseLine1',
          'addresseLine2',
          'city',
          'state',
          'postalCode',
          'country',
        ],
        caseSensitive: false,
        fuzzySearch: false,
      },
      populate: {
        fields: [{ path: 'user', select: '_id firstname email' }],
        defaultPopulate: true,
      },
    });
  }

  async getAddresse(filters: any) {
    const { page = 1, limit = 10, sort, search = '', user } = filters;

    const query: any = {};

    if (user) query.user = user;
    return this.findAll({
      query,
      sort: sort as Record<string, 1 | -1>,
      page: parseInt(page),
      limit: parseInt(limit),
      searchTerm: search as string,
    });
  }
}

export default new AddresseService();
