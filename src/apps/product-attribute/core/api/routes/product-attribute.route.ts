import { Router } from 'express';
import {
  adminAuthentication,
  authorizeRequest,
} from 'modules/authz/authentication/middlewares';
import { ProductAttributeController } from '../controllers';

const router = Router();

router.post(
  '/create',
  authorizeRequest,
  adminAuthentication,
  ProductAttributeController.createProductAttribute,
);

router.get('/', ProductAttributeController.getProductAttribute);

router.get('/:id', ProductAttributeController.getCategoryById);

router.put(
  '/update/:id',
  authorizeRequest,
  adminAuthentication,
  ProductAttributeController.updateProductAttribute,
);

router.delete(
  '/delete/:id',
  authorizeRequest,
  adminAuthentication,
  ProductAttributeController.deleteProductAttribute,
);

export default router;
