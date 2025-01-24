import { Router } from 'express';
import {
  adminAuthentication,
  authorizeRequest,
} from 'modules/authz/authentication/middlewares';
import { OrdersController } from '../controllers';

const router = Router();

router.post('/', authorizeRequest, OrdersController.createOrders);

router.get('/', authorizeRequest, OrdersController.getOrdersByUser);

router.get(
  '/:orderId',
  authorizeRequest,
  OrdersController.getOrdersByUserByOrdersId,
);

router.get(
  '/',
  authorizeRequest,
  adminAuthentication,
  OrdersController.getAllOrders,
);

router.put('/update/:orderId', authorizeRequest, OrdersController.updateOrders);

router.delete('/:orderId', authorizeRequest, OrdersController.deleteOrder);

export default router;
