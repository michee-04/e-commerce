// src/pages-controllers/admin/controllers/adminController.ts
import { Request, Response } from 'express';

export class AdminController {
  // Méthode pour afficher le tableau de bord admin
  static dashboard(req: Request, res: Response): void {
    res.render('admin/dashboard'); // Assurez-vous d'avoir une vue associée à cette route
  }

  // Autres méthodes d'administration peuvent être ajoutées ici
}
