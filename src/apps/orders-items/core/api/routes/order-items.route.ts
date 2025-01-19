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

// TODO: A tester et regler
// router.get(
//   'all',
//   authorizeRequest,
//   adminAuthentication,
//   OrderItemController.getUsersAllOrders,
// );

router.get(
  '/:orderId/:orderItemId',
  authorizeRequest,
  OrderItemController.getOrdersItemsId,
);

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
