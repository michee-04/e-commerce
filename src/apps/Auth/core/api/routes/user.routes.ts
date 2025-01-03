import { Router } from 'express';
import UserController from '../controllers/user.controller';

const router = Router();

router.post('/register', UserController.register);

router.post('/verify-account', UserController.verifyAccount);

router.post('/generate-login-otp', UserController.generateLoginOtp);

router.post('/login-with-otp', UserController.loginWithOtp);

router.post('/login-with-password', UserController.loginWithPassword);

router.post('/refresh-token', UserController.refreshToken);

router.post('/forgot-password', UserController.forgotPassword);

router.post('/logout', UserController.logout);

router.post('/reset-password', UserController.resetPassword);

export default router;
