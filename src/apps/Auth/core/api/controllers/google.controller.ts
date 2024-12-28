import { Request, Response } from 'express';

class GoogleController {
  static async login(req: Request, res: Response) {
    res.send("<a href='/api/v1/google/auth/google'>Login with Google</a>");
  }

  static async googleCallback(req: Request, res: Response) {
    res.redirect('/api/v1/google/profile');
  }

  static async getProfile(req: Request, res: Response) {
    res.send(`Welcome ${req.user}`);
  }

  static async logout(req: Request, res: Response) {
    req.logout(() => {
      res.redirect('/');
    });
  }
}

export default GoogleController;
