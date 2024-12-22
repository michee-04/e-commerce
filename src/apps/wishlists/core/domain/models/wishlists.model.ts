import { BaseModel, createBaseSchema } from '@nodesandbox/repo-framework';
import {
  PRODUCT_MODEL_NAME,
  USER_MODEL_NAME,
  WISHLISTS_MODEL_NAME,
} from 'modules/shared/models';
import { Schema } from 'mongoose';
import { IWishlistsModel } from '../types';

const wishlistsSchema = createBaseSchema<IWishlistsModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: USER_MODEL_NAME,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: PRODUCT_MODEL_NAME,
    },
  },
  {
    modelName: WISHLISTS_MODEL_NAME,
  },
);

const wishlistsModel = new BaseModel<IWishlistsModel>(
  WISHLISTS_MODEL_NAME,
  wishlistsSchema,
);

export { wishlistsModel, wishlistsSchema };
