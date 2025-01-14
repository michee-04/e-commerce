import { Request, Response } from 'express';
import ViewService from 'modules/shared/service/view.service';

export class AuthViewsController {
  private viewService: ViewService;

  constructor() {
    this.viewService = new ViewService();
  }

  showLoginPage(req: Request, res: Response) {
    this.viewService.renderPage(req, res, 'pages/auth/login', {
      title: 'Login',
    });
  }

  showRegisterPage(req: Request, res: Response) {
    this.viewService.renderPage(req, res, 'pages/auth/register', {
      title: 'Register',
    });
  }
}
