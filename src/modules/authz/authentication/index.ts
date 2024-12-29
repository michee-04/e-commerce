import { adminAuthentication, authenticate } from './middlewares';
import { AuthService } from './services';

export const AuthenticationModule = {
  services: {
    AuthService,
  },
  middlewares: {
    authenticate,
    enableAdminAuth: adminAuthentication,
  },
};
