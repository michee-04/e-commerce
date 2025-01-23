import { BaseService } from '@nodesandbox/repo-framework';

import {
  ErrorResponse,
  ErrorResponseType,
  SuccessResponseType,
} from '@nodesandbox/response-kit';
import { UserService } from 'modules/features/actions';
import { MailServiceUtilities } from 'modules/shared/notificator/mail';
import { INotificationsModel, notificationsModel } from '../../domain';
import { NotificationRepository } from '../repository';

class NotificationService extends BaseService<
  INotificationsModel,
  NotificationRepository
> {
  constructor() {
    const notificationRepo = new NotificationRepository(notificationsModel);
    super(notificationRepo, {
      filter: {
        allowedFields: ['user', 'message', 'status'],
        defaultSort: { createdAt: -1 },
      },
      search: {
        enabled: true,
        fields: ['message', 'status'],
        caseSensitive: false,
        fuzzySearch: false,
      },
      populate: {
        fields: [{ path: 'user', select: '_id firstname email' }],
        defaultPopulate: true,
      },
    });
  }

  async createNotification(
    payload: any,
  ): Promise<SuccessResponseType<null> | ErrorResponseType> {
    try {
      const { user, message } = payload;

      const userResponse = (await UserService.findById(user)) as any;
      if (!userResponse.success) {
        throw userResponse.error;
      }

      await MailServiceUtilities.sendNotification({
        to: userResponse.data.docs.email,
        firstname: userResponse.data.docs.firstname,
        message,
      });

      const notification = await this.repository.create(payload);

      return {
        success: true,
        data: {
          notification: notification,
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

  async getNotification(filters: any) {
    const { page = 1, limit = 10, sort, search = '' } = filters;

    return this.findAll({
      sort: sort as Record<string, 1 | -1>,
      page: parseInt(page),
      limit: parseInt(limit),
      searchTerm: search as string,
    });
  }
}

export default new NotificationService();
