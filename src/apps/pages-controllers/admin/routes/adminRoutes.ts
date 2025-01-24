// src/pages-controllers/admin/routes/adminRoutes.ts
import { Router } from 'express';
import { AdminController } from '../controllers/adminController';

const router = Router();

// Définir les routes pour l'administration
router.get('/dashboard', AdminController.dashboard);
// Ajoutez d'autres routes si nécessaire

export { router as adminRoutes };
