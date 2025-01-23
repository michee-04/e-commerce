import { Router } from 'express';
import {
  adminAuthentication,
  authorizeRequest,
} from 'modules/authz/authentication/middlewares';
import { AddresseController } from '../controllers';

const router = Router();

router.post('/', AddresseController.createAddresse);

router.get('/:userId', AddresseController.getAddresseUser);

router.get(
  '/all',
  authorizeRequest,
  adminAuthentication,
  AddresseController.createAddresse,
);

router.put('/:addresseId', AddresseController.updateAddresse);

router.delete('/:addresseId', AddresseController.deleteAddresse);

export default router;
