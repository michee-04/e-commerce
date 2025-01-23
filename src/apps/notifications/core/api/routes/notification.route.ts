import { Router } from 'express';
import { authorizeRequest } from 'modules/authz/authentication/middlewares';
import { NotificationController } from '../controllers';

const router = Router();

router.post('/', authorizeRequest, NotificationController.createNotification);

export default router;
