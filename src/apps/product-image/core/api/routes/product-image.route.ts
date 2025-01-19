import { Router } from 'express';
import {
  adminAuthentication,
  authorizeRequest,
} from 'modules/authz/authentication/middlewares';
import multer from 'multer';
import { ProductImageController } from '../controllers';

const router = Router();
const upload = multer();

router.post(
  '/:productId',
  upload.single('image'),
  authorizeRequest,
  adminAuthentication,
  ProductImageController.createProductImage,
);

router.get('/:productId', ProductImageController.getProductImage);

router.get('/', ProductImageController.getAllProductImage);

router.get('/:id', ProductImageController.getProductImageById);

router.put(
  '/:id',
  upload.single('image'),
  authorizeRequest,
  adminAuthentication,
  ProductImageController.updateProductImage,
);

router.get('/:imageId/download', ProductImageController.downloadProductImage);

router.delete(
  '/:id',
  authorizeRequest,
  adminAuthentication,
  ProductImageController.deleteProductImage,
);

export default router;
