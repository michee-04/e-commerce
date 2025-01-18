import { Router } from 'express';
import {
  adminAuthentication,
  authorizeRequest,
} from 'modules/authz/authentication/middlewares';
import { WIshlistsController } from '../controllers';

const router = Router();

router.post(
  '/:userId/:productId',
  authorizeRequest,
  WIshlistsController.createWishlists,
);

router.get(
  '/:userId',
  authorizeRequest,
  WIshlistsController.getWishlistsByUser,
);

router.get(
  '/:userId/:productId',
  authorizeRequest,
  WIshlistsController.getWishlistsByUserIdByProductId,
);

router.get(
  '/admin/',
  authorizeRequest,
  adminAuthentication,
  WIshlistsController.getAllWishlists,
);

router.get(
  '/admin/:id',
  authorizeRequest,
  WIshlistsController.getWishlistsById,
);

router.delete('/:id', authorizeRequest, WIshlistsController.deleteWishlists);

export default router;
