/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiResponse } from '@nodesandbox/response-kit';
import { NextFunction, Request, Response } from 'express';
import { sanitize } from 'helpers';
import { ReviewsService } from '../../business';
import { ReviewsRequestDto } from '../dtos';

export class ReviewsController {
  static async createReviews(req: Request, res: Response) {
    try {
      // @ts-ignore: Suppress TS error for non-existent property
      const user = req.payload.aud;
      const product = req.params.productId;
      const _payload = sanitize(req.body, ReviewsRequestDto);

      if (!_payload.success) {
        throw _payload.error;
      }

      _payload.data = {
        ..._payload.data,
        user: user,
        product: product,
      };

      const response = await ReviewsService.create(_payload.data);
      if (!response.success) {
        throw response.error;
      }

      ApiResponse.success(res, response, 201);
    } catch (error) {
      ApiResponse.error(res, {
        success: false,
        error: error as any,
      });
    }
  }

  static async getAllReviews(req: Request, res: Response, next: NextFunction) {
    try {
      const filters = req.query;
      const response = await ReviewsService.getReviews(filters);
      if (!response.success) {
        throw response.error;
      }

      ApiResponse.success(res, response, 202);
    } catch (error) {
      ApiResponse.error(res, {
        success: false,
        error: error as any,
      });
    }
  }

  static async getReviewsById(req: Request, res: Response) {
    try {
      const reviewsId = req.params.id;

      const response = await ReviewsService.findById(reviewsId);

      if (!response.success) {
        throw response.error;
      }

      ApiResponse.success(res, response);
    } catch (error) {
      ApiResponse.error(res, {
        success: false,
        error: error as any,
      });
    }
  }

  static async updateReviews(req: Request, res: Response) {
    try {
      const reviewId = req.params.id;
      const _payload = sanitize(req.body, ReviewsRequestDto);

      if (!_payload.success) {
        throw _payload.error;
      }

      const response = await ReviewsService.updateById(reviewId, _payload.data);

      if (!response.success) {
        throw response.error;
      }

      ApiResponse.success(
        res,
        { ...response, message: 'the reviews has been successfully modified' },
        202,
      );
    } catch (error) {
      ApiResponse.error(res, {
        success: false,
        error: error as any,
      });
    }
  }

  static async deleteReviews(req: Request, res: Response) {
    try {
      const reviewsId = req.params.id;

      const response = await ReviewsService.deleteById(reviewsId);

      if (!response.success) {
        throw response.error;
      }

      ApiResponse.success(
        res,
        { ...response, message: 'the reviews has been successfully removed' },
        202,
      );
    } catch (error) {
      ApiResponse.error(res, {
        success: false,
        error: error as any,
      });
    }
  }
}
