import { Router } from 'express';
import {
  adminAuthentication,
  authorizeRequest,
} from 'modules/authz/authentication/middlewares';
import { InventoryController } from '../controllers';

const router = Router();

router.post(
  '/:productId/:supplierId',
  authorizeRequest,
  adminAuthentication,
  InventoryController.createInventory,
);

router.get(
  '/',
  authorizeRequest,
  adminAuthentication,
  InventoryController.getAllInventory,
);

router.get(
  '/:id',
  authorizeRequest,
  adminAuthentication,
  InventoryController.getInventoryById,
);

router.put(
  '/',
  authorizeRequest,
  adminAuthentication,
  InventoryController.updateInventory,
);

router.delete(
  '/',
  authorizeRequest,
  adminAuthentication,
  InventoryController.deleteInventory,
);

export default router;
