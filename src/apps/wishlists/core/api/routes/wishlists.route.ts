import { Router } from 'express';
import {
  adminAuthentication,
  authorizeRequest,
} from 'modules/authz/authentication/middlewares';
import { WIshlistsController } from '../controllers';

const router = Router();

router.post(
  '/:productId',
  authorizeRequest,
  WIshlistsController.createWishlists,
);

router.get('', authorizeRequest, WIshlistsController.getWishlistsByUser);

router.get(
  '/:productId',
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
