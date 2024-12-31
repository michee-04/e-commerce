import { Router } from 'express';
import {
  adminAuthentication,
  authorizeRequest,
} from 'modules/authz/authentication/middlewares';
import multer from 'multer';
import { categoryController } from '../controllers';

const router = Router();
const upload = multer();

router.post(
  '/create',
  upload.single('image'),
  authorizeRequest,
  adminAuthentication,
  categoryController.createCategory,
);

router.get('/', categoryController.getCategory);

router.get('/:id', categoryController.getCategoryById);

router.put(
  '/update/:id',
  upload.single('image'),
  authorizeRequest,
  adminAuthentication,
  categoryController.updateCategory,
);

router.get('/image/:id/download', categoryController.downloadCategoryImage);

router.delete(
  '/delete/:id',
  upload.single('image'),
  authorizeRequest,
  adminAuthentication,
  categoryController.deleteCategory,
);

export default router;
