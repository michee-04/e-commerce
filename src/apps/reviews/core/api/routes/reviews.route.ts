import { Router } from 'express';
import { authorizeRequest } from 'modules/authz/authentication/middlewares';
import { ReviewsController } from '../controllers';

const router = Router();

router.post(
  '/:userId/:productId',
  authorizeRequest,
  ReviewsController.createReviews,
);

router.get('/', authorizeRequest, ReviewsController.getAllReviews);

router.get('/:id', authorizeRequest, ReviewsController.getReviewsById);

router.put('/update/:id', authorizeRequest, ReviewsController.updateReviews);

router.delete('/delete/:id', authorizeRequest, ReviewsController.deleteReviews);

export default router;
