import { BaseModel, createBaseSchema } from '@nodesandbox/repo-framework';
import {
  NOTIFICATIONS_MODEL_NAME,
  USER_MODEL_NAME,
} from 'modules/shared/models';
import { Schema } from 'mongoose';
import { INotificationsModel } from '../types';

const notificationSchema = createBaseSchema<INotificationsModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: USER_MODEL_NAME,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    modelName: NOTIFICATIONS_MODEL_NAME,
  },
);

const notificationsModel = new BaseModel<INotificationsModel>(
  NOTIFICATIONS_MODEL_NAME,
  notificationSchema,
).getModel();

export { notificationSchema, notificationsModel };
