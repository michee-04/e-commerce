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
  '/:supplierId',
  authorizeRequest,
  adminAuthentication,
  SuppliersController.getSupplierById,
);

router.put(
  '/:supplierId',
  authorizeRequest,
  adminAuthentication,
  SuppliersController.updateSupplier,
);

router.delete(
  '/:supplierId',
  authorizeRequest,
  adminAuthentication,
  SuppliersController.deleteSupplier,
);

export default router;
