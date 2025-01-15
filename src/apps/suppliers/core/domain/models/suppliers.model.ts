import { BaseModel, createBaseSchema } from '@nodesandbox/repo-framework';
import {
  ADDRESS_MODEL_NAME,
  SUPPLIERS_MODEL_NAME,
  USER_MODEL_NAME,
} from 'modules/shared/constants';
import { Schema } from 'mongoose';
import { ISuppliersModel } from '../types';

const suppliersSchema = createBaseSchema<ISuppliersModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: USER_MODEL_NAME,
      required: true,
    },
    contactName: {
      type: String,
    },
    addressId: {
      type: Schema.Types.ObjectId,
      ref: ADDRESS_MODEL_NAME,
      required: true,
    },
  },
  {
    modelName: SUPPLIERS_MODEL_NAME,
  },
);

const suppliersModel = new BaseModel<ISuppliersModel>(
  SUPPLIERS_MODEL_NAME,
  suppliersSchema,
).getModel();

export { suppliersModel, suppliersSchema };
