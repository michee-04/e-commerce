import { Router } from 'express';
import { AuthViewsController } from '../controllers';

const router = Router();
const authViewsController = new AuthViewsController();

router.get(
  '/login',
  authViewsController.showLoginPage.bind(authViewsController),
);

export default router;
