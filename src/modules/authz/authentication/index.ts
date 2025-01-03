import { adminAuthentication, authorizeRequest } from './middlewares';
import { AuthService } from './services';

export const AuthenticationModule = {
  services: {
    AuthService,
  },
  middlewares: {
    authorizeRequest,
    enableAdminAuth: adminAuthentication,
  },
};
