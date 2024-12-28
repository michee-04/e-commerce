import { BaseService } from '@nodesandbox/repo-framework';
import { categoryModel, ICategoryModel } from '../../domain';
import { CategoryRepository } from '../repository';

export class CategoryService extends BaseService<
  ICategoryModel,
  CategoryRepository
> {
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
}
