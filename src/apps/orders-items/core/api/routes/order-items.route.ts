import { Router } from 'express';
import {
  adminAuthentication,
  authorizeRequest,
} from 'modules/authz/authentication/middlewares';
import { OrderItemController } from '../controllers';

const router = Router();

router.post(
  '/:orderId/:productId',
  authorizeRequest,
  OrderItemController.createOrderItem,
);

router.get(
  '/:orderId/:productId',
  authorizeRequest,
  OrderItemController.getUsersAllOrders,
);

router.get('/:id', authorizeRequest, OrderItemController.getOrdersItemsId);

router.put(
  '/update/:orderItemId',
  authorizeRequest,
  OrderItemController.updateOrderItem,
);

router.delete(
  '/delete/:orderItemId',
  authorizeRequest,
  adminAuthentication,
  OrderItemController.deleteOrderItem,
);

export default router;
