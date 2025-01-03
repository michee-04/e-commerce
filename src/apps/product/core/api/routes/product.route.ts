import { Router } from 'express';
import {
  adminAuthentication,
  authorizeRequest,
} from 'modules/authz/authentication/middlewares';
import { ProductController } from '../controllers';

const router = Router();

router.post(
  '/create',
  authorizeRequest,
  adminAuthentication,
  ProductController.createProduct,
);

router.get('/', ProductController.getProduct);

router.get('/:id', ProductController.getProductById);

router.put(
  '/update/:id',
  authorizeRequest,
  adminAuthentication,
  ProductController.updateProduct,
);

router.delete(
  '/delete/:id',
  authorizeRequest,
  adminAuthentication,
  ProductController.deleteProduct,
);

export default router;
