import { Router } from 'express';
import {
  adminAuthentication,
  authorizeRequest,
} from 'modules/authz/authentication/middlewares';
import { AddresseController } from '../controllers';

const router = Router();

router.post('/:userId', AddresseController.createAddresse);

router.get('/', authorizeRequest, AddresseController.getAddresseUser);

router.get(
  '/all',
  authorizeRequest,
  adminAuthentication,
  AddresseController.getAllAddresse,
);

router.put('/:id', authorizeRequest, AddresseController.updateAddresse);

router.delete(
  '/:id',
  authorizeRequest,
  adminAuthentication,
  AddresseController.deleteAddresse,
);

export default router;
