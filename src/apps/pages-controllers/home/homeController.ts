// src/pages-controllers/home/homeController.ts
import { Request, Response } from 'express';

export class HomeController {
  static async showHomePage(req: Request, res: Response) {
    try {
      // Logique pour obtenir des données nécessaires pour la page d'accueil
      res.render('home'); // Rendre la vue 'home.ejs'
    } catch (error) {
      console.error('Error rendering home page:', error);
      res.status(500).send('Error rendering home page');
    }
  }
}
