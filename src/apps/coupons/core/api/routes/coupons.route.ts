import { Router } from 'express';
import {
  adminAuthentication,
  authorizeRequest,
} from 'modules/authz/authentication/middlewares';
import { CouponsController } from '../controllers';

const router = Router();

router.post(
  '/',
  authorizeRequest,
  adminAuthentication,
  CouponsController.createCoupn,
);

router.get('/', authorizeRequest, CouponsController.getCoupons);

router.get('/:id', authorizeRequest, CouponsController.getCouponsId);

router.put(
  '/:id',
  authorizeRequest,
  adminAuthentication,
  CouponsController.updateCoupon,
);

router.delete(
  '/:id',
  authorizeRequest,
  adminAuthentication,
  CouponsController.deleteCoupon,
);

export default router;
