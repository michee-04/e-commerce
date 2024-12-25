import flash from 'connect-flash';
import { passportInstance } from 'core/config/google.config';
import { Application } from 'express';
import session from 'express-session';

export const initializeSessionAndFlash = (app: Application = APP): void => {
  app.use(
    session({
      secret: CONFIG.session.secret,
      resave: false,
      saveUninitialized: true,
      cookie: { secure: CONFIG.runningProd },
    }),
  );

  app.use(flash());
  app.use(passportInstance.initialize());
  app.use(passportInstance.session());
};
