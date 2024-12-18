import { BaseService } from '@nodesandbox/repo-framework';
import { ITodoModel, TodoModel } from 'apps/demo/core/domain';
import { TodoRepository } from '../repositories';

class TodoService extends BaseService<ITodoModel, TodoRepository> {
  constructor() {
    const todoRepo = new TodoRepository(TodoModel);
    super(todoRepo, {
      filter: {
        allowedFields: ['dueDate', 'completed', 'priority'],
        defaultSort: { createdAt: -1 },
      },
      slug: {
        enabled: true,
        sourceField: 'title',
        targetField: 'slugger',
      },
      search: {
        enabled: true,
        fields: ['title', 'description', 'label'],
        caseSensitive: false,
        fuzzySearch: false,
      },
      // populate: {
      //   fields: [{ path: 'subForm', select: '_id title description' }],
      //   defaultPopulate: true,
      // },
    });
  }
}

export default new TodoService();
