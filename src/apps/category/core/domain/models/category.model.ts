import { BaseModel, createBaseSchema } from '@nodesandbox/repo-framework';
import { CATEGORY_NAME_MODEL } from 'modules/shared/constants';
import { ICategoryModel } from '../types';

const categorySchema = createBaseSchema<ICategoryModel>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    modelName: CATEGORY_NAME_MODEL,
  },
);

const categoryModel = new BaseModel<ICategoryModel>(
  CATEGORY_NAME_MODEL,
  categorySchema,
).getModel();

export { categoryModel };
