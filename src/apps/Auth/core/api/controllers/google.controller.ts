import { Request, Response } from 'express';

class GoogleController {
  static async login(req: Request, res: Response) {
    res.send("<a href='/api/v1/google/auth/google'>Login with Google</a>");
  }

  static async googleCallback(req: Request, res: Response) {
    res.redirect('/api/v1/google/profile');
  }

  static async getProfile(req: Request, res: Response) {
    try {
      // Vérifiez si l'utilisateur est authentifié
      if (!req.user) {
        return res.status(401).json({ message: 'User not authenticated' });
      }

      // Type du profil utilisateur
      const user = req.user as {
        profile: {
          displayName?: string;
          emails?: { value: string }[];
          photos?: { value: string }[];
        };
        accessToken?: string;
      };

      // Extraire les informations du profil utilisateur
      const displayName = user.profile?.displayName ?? 'Name not available';
      const email = user.profile?.emails?.[0]?.value ?? 'Email not available';
      const picture =
        user.profile?.photos?.[0]?.value ?? 'https://via.placeholder.com/150';
      const accessToken = user.accessToken ?? 'Access token not available';

      // Réponse HTML avec le profil utilisateur
      return res.send(`
        <h1>Welcome, ${displayName}</h1>
        <p>Email: ${email}</p>
        <img src="${picture}" alt="Profile Picture" />
        <p><strong>Access Token:</strong> ${accessToken}</p>
      `);
    } catch (error) {
      // Gérer les erreurs inattendues
      console.error('Error fetching user profile:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async logout(req: Request, res: Response) {
    req.logout(() => {
      res.redirect('/');
    });
  }
}

export default GoogleController;
