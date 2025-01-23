import { BaseRepository } from '@nodesandbox/repo-framework';
import { Model } from 'mongoose';
import { INotificationsModel } from '../../domain';

export class NotificationRepository extends BaseRepository<INotificationsModel> {
  constructor(model: Model<INotificationsModel>) {
    super(model);
  }
}
