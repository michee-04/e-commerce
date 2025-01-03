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
        },
        (accessToken, refreshToken, profile, done) => {
          return done(null, profile);
        },
      ),
    );
  }

  private setupSerialization(): void {
    passport.serializeUser((user, done) => {
      done(null, user);
    });

    passport.deserializeUser((user, done) => {
      done(null, user as any);
    });
  }

  getPassportInstance(): typeof passport {
    return passport;
  }
}

export default PassportGoogleAuth;
