import { BaseModel, createBaseSchema } from '@nodesandbox/repo-framework';
import { PasswordUtils } from 'helpers';
import { CallbackError } from 'mongoose';
import { IUserModel } from '../types';

const USER_MODEL_NAME = 'User';

const userSchema = createBaseSchema<IUserModel>(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'super-admin'],
      default: 'user',
    },
    active: {
      type: Boolean,
      default: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    modelName: USER_MODEL_NAME,
  },
);

userSchema.pre('save', async function (next) {
  try {
    if (this.isNew || this.isModified('password')) {
      this.password = await PasswordUtils.hashPassword(this.password);
    }
    next();
  } catch (error) {
    next(error as CallbackError);
  }
});

const UserModel = new BaseModel<IUserModel>(
  USER_MODEL_NAME,
  userSchema,
).getModel();

export { UserModel };
