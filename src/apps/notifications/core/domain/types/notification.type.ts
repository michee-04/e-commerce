import { IBaseModel } from '@nodesandbox/repo-framework';
import { Document } from 'mongoose';

export interface INotifications {
  user: string;
  message: string;
  status: boolean;
}

export interface INotificationsModel
  extends INotifications,
    IBaseModel,
    Document {}
