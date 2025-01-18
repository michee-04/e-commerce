import { Router } from 'express';
import {
  adminAuthentication,
  authorizeRequest,
} from 'modules/authz/authentication/middlewares';
import { PromotioonsController } from '../controllers';

const router = Router();

router.post(
  '/:productId',
  authorizeRequest,
  adminAuthentication,
  PromotioonsController.createPromotoions,
);

router.get('/', PromotioonsController.getAllPromotion);

router.get('/:id', PromotioonsController.getPromotionById);

router.put(
  '/:id',
  authorizeRequest,
  adminAuthentication,
  PromotioonsController.updatePromotion,
);

router.delete(
  '/:id',
  authorizeRequest,
  adminAuthentication,
  PromotioonsController.deletePromotion,
);

export default router;
