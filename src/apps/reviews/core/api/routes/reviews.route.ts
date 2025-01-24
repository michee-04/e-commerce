import { Router } from 'express';
import { authorizeRequest } from 'modules/authz/authentication/middlewares';
import { ReviewsController } from '../controllers';

const router = Router();

router.post('/:productId', authorizeRequest, ReviewsController.createReviews);

router.get('/', authorizeRequest, ReviewsController.getAllReviews);

router.get('/:id', authorizeRequest, ReviewsController.getReviewsById);

router.put('/:id', authorizeRequest, ReviewsController.updateReviews);

router.delete('/:id', authorizeRequest, ReviewsController.deleteReviews);

export default router;
