import { BaseModel, createBaseSchema } from '@nodesandbox/repo-framework';
import { ADDRESS_MODEL_NAME, USER_MODEL_NAME } from 'modules/shared/constants';
import { Schema } from 'mongoose';
import { IAddresseModel } from '../types';

const addresseSchema = createBaseSchema<IAddresseModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: USER_MODEL_NAME,
      unique: true,
      required: true,
    },
    addresseLine1: {
      type: String,
    },
    addresseLine2: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
    },
    postalCode: {
      type: String,
    },
    country: {
      type: String,
    },
    addresseType: {
      type: String,
      enum: ['billing', 'shipping'],
    },
  },
  {
    modelName: ADDRESS_MODEL_NAME,
  },
);

const addresseModel = new BaseModel<IAddresseModel>(
  ADDRESS_MODEL_NAME,
  addresseSchema,
).getModel();

export { addresseModel, addresseSchema };
