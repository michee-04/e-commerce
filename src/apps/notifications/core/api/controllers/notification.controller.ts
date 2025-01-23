import { ApiResponse } from '@nodesandbox/response-kit';
import { Request, Response } from 'express';
import { sanitize } from 'helpers';
import { NotificationService } from '../../business';
import { NotificationsRequestDto } from '../dtos';

export class NotificationController {
  static async createNotification(req: Request, res: Response) {
    try {
      //
      const user = req.params.userId;
      const payload = sanitize(req.body, NotificationsRequestDto);
      if (!payload.success) {
        throw payload.error;
      }
      payload.data.user = user;

      const response = await NotificationService.createNotification(payload);
      if (!response.success) {
        throw response.error;
      }

      ApiResponse.success(res, response, 201);
    } catch (error) {
      ApiResponse.error(res, {
        success: false,
        error: error as any,
      });
    }
  }
}
