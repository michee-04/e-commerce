import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

class PassportGoogleAuth {
  constructor(
    private config: {
      clientId: string;
      secretClient: string;
      callbackUrl: string;
    },
  ) {
    this.initializeGoogleStrategy();
    this.setupSerialization();
  }

  private initializeGoogleStrategy(): void {
    passport.use(
      new GoogleStrategy(
        {
          clientID: this.config.clientId,
          clientSecret: this.config.secretClient,
          callbackURL: this.config.callbackUrl,
          scope: [
            'profile',
            'email',
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
            'offline_access',
          ],
        },
        (accessToken, refreshToken, profile, done) => {
          const enhancedProfile = { profile, accessToken, refreshToken };
          return done(null, enhancedProfile);
        },
      ),
    );
  }

  private setupSerialization(): void {
    passport.serializeUser((user: any, done) => {
      console.log('Serializing User:', user);
      done(null, user);
    });

    passport.deserializeUser((user: any, done) => {
      console.log('Deserializing User:', user);
      done(null, user);
    });
  }

  getPassportInstance(): typeof passport {
    return passport;
  }
}

export default PassportGoogleAuth;
