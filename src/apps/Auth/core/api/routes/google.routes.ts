import { passportInstance } from 'core/config/google.config';
import { Router } from 'express';
import GoogleController from '../controllers/google.controller';
import { isGoogleAuthenticated } from '../middleware';

const router = Router();

router.get('/', GoogleController.login);

router.get(
  '/auth/google',
  passportInstance.authenticate('google', { scope: ['profile', 'email'] }),
);

router.get(
  '/auth/google/callback',
  passportInstance.authenticate('google', { failureRedirect: '/' }),
  GoogleController.googleCallback,
);

router.get('/profile', isGoogleAuthenticated, GoogleController.getProfile);

router.get('/logout', GoogleController.logout);

export default router;
