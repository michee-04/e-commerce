import { Router } from 'express';
import {
  adminAuthentication,
  authorizeRequest,
} from 'modules/authz/authentication/middlewares';
import { OrdersController } from '../controllers';

const router = Router();

router.post('/:userId', authorizeRequest, OrdersController.createOrders);

router.get('/:userId', authorizeRequest, OrdersController.getOrdersByUser);

router.get(
  '/:userId/:orderId',
  authorizeRequest,
  OrdersController.getOrdersByUserByOrdersId,
);

router.get(
  '/',
  authorizeRequest,
  adminAuthentication,
  OrdersController.getAllOrders,
);

router.put(
  '/update/:userId/:orderId',
  authorizeRequest,
  OrdersController.updateOrders,
);

router.delete(
  '/delete/:userId/:orderId',
  authorizeRequest,
  OrdersController.deleteOrder,
);

export default router;
