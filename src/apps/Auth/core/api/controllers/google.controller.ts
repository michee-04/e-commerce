/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import { AuthService } from 'modules/authz/authentication/services';

class GoogleController {
  static async login(req: Request, res: Response) {
    res.send("<a href='/api/v1/google/auth/google'>Login with Google</a>");
  }

  static async googleCallback(req: Request, res: Response) {
    res.redirect('/api/v1/google/profile');
  }

  static async getProfile(req: Request, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

      const user = req.user as {
        profile: {
          displayName?: string;
          emails?: { value: string }[];
          photos?: { value: string }[];
        };
        accessToken?: string;
      };

      const displayName = user.profile?.displayName ?? 'Name not available';
      const email = user.profile?.emails?.[0]?.value ?? 'Email not available';
      const picture =
        user.profile?.photos?.[0]?.value ?? 'https://via.placeholder.com/150';
      const accessToken = user.accessToken ?? 'Access token not available';

      const parts = displayName.trim().split(' ');

      const firstname = parts[0] || '';

      const lastname = parts.slice(1).join(' ') || '';
      const password = CONFIG.google.password;

      const payload = { firstname, lastname, email, password };
      const response = await AuthService.connectByGoogle(payload);

      if (!response.success) {
        throw response.error;
      }

      return res.send(`
        <h1>Id, ${response.data?.user._id}</h1>
        <h1>Welcome, ${firstname} ${lastname}</h1>
        <p>Email: ${email}</p>
        <p><strong>Access Token:</strong> ${response.data?.token.access}</p>
        <p><strong>Refresh Token:</strong> ${response.data?.token.refresh}</p>

      `);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return res
        .status(500)
        .json({ message: 'Internal server error', error: error });
    }
  }

  static async logout(req: Request, res: Response) {
    req.logout(() => {
      res.redirect('/');
    });
  }
}

export default GoogleController;
