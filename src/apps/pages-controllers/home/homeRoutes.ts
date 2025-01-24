// src/pages-controllers/home/homeRoutes.ts
import { Router } from 'express';
import { HomeController } from './homeController';

const router = Router();

// Route pour afficher la page d'accueil
router.get('/', HomeController.showHomePage);

export { router as homeRoutes };
