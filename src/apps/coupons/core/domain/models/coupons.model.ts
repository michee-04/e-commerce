import { BaseModel, createBaseSchema } from '@nodesandbox/repo-framework';
import { COUPONS_MODEL_NAME } from 'modules/shared/constants';
import { ICOuponsModel } from '../types';

const couponsSchema = createBaseSchema<ICOuponsModel>(
  {
    code: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
    },
    discountType: {
      type: String,
    },
    discountValue: {
      type: String,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  {
    modelName: COUPONS_MODEL_NAME,
  },
);

const couponsModel = new BaseModel<ICOuponsModel>(
  COUPONS_MODEL_NAME,
  couponsSchema,
).getModel();

export { couponsModel, couponsSchema };
