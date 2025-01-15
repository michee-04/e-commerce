import { Router } from 'express';
import { authorizeRequest } from 'modules/authz/authentication/middlewares';
import { OrderItemController } from '../controllers';

const router = Router();

router.post('/', authorizeRequest, OrderItemController.createOrderItem);

export default router;
