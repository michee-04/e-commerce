import { Router } from 'express';
import { adminAuthentication } from 'modules/authz/authentication/middlewares';
import AdminController from '../controllers/admin.controller';

const router = Router();

// Route pour le tableau de bord admin
router.get('/dashboard', adminAuthentication, AdminController.dashboard);

router.post('/register', adminAuthentication, AdminController.registerAdmin);

router.post(
  '/verify-account',
  adminAuthentication,
  AdminController.verifyAccountAdmin,
);

router.post(
  '/generate-login-otp',
  adminAuthentication,
  AdminController.generateLoginOtp,
);

router.post(
  '/login-with-otp',
  adminAuthentication,
  AdminController.loginWithOtp,
);

router.post(
  '/login-with-password',
  adminAuthentication,
  AdminController.loginWithPassword,
);

router.post(
  '/refresh-token',
  adminAuthentication,
  AdminController.refreshToken,
);

router.post(
  '/forgot-password',
  adminAuthentication,
  AdminController.forgotPassword,
);

router.post('/logout', adminAuthentication, AdminController.logout);

router.post(
  '/reset-password',
  adminAuthentication,
  AdminController.resetPassword,
);

export default router;
