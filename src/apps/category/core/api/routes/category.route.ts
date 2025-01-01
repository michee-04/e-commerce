import { Router } from 'express';
import {
  adminAuthentication,
  authorizeRequest,
} from 'modules/authz/authentication/middlewares';
import multer from 'multer';
import { CategoryController } from '../controllers';

const router = Router();
const upload = multer();

router.post(
  '/create',
  upload.single('image'),
  authorizeRequest,
  adminAuthentication,
  CategoryController.createCategory,
);

router.get('/', CategoryController.getCategory);

router.get('/:id', CategoryController.getCategoryById);

router.put(
  '/update/:id',
  upload.single('image'),
  authorizeRequest,
  adminAuthentication,
  CategoryController.updateCategory,
);

router.get('/image/:id/download', CategoryController.downloadCategoryImage);

router.delete(
  '/delete/:id',
  upload.single('image'),
  authorizeRequest,
  adminAuthentication,
  CategoryController.deleteCategory,
);

export default router;
