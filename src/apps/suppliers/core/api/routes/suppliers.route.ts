import { Router } from 'express';
import {
  adminAuthentication,
  authorizeRequest,
} from 'modules/authz/authentication/middlewares';
import { SuppliersController } from '../controllers';

const router = Router();

router.post(
  '/',
  authorizeRequest,
  adminAuthentication,
  SuppliersController.createSuppliers,
);

router.get(
  '/',
  authorizeRequest,
  adminAuthentication,
  SuppliersController.getAllSuppliers,
);

router.get(
  '/:id',
  authorizeRequest,
  adminAuthentication,
  SuppliersController.getSupplierById,
);

router.put(
  '/:id',
  authorizeRequest,
  adminAuthentication,
  SuppliersController.updateSupplier,
);

router.delete(
  '/:id',
  authorizeRequest,
  adminAuthentication,
  SuppliersController.deleteSupplier,
);

export default router;
