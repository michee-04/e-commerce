import { Router } from 'express';
import { AuthViewsController } from '../controllers';

const router = Router();
const authViewsController = new AuthViewsController();

router.get(
  '/login',
  authViewsController.showLoginPage.bind(authViewsController),
);

router.get(
  '/register',
  authViewsController.showRegisterPage.bind(authViewsController),
);

export default router;
