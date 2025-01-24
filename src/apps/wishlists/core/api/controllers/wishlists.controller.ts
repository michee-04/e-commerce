/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ApiResponse } from '@nodesandbox/response-kit';
import { Request, Response } from 'express';
import { WishlistsService } from '../../business';

export class WIshlistsController {
  static async createWishlists(req: Request, res: Response) {
    try {
      // @ts-ignore: Suppress TS error for non-existent property
      const user = req.payload.aud;
      const product = req.params.productId;

      const payload = { user, product };

      const response = await WishlistsService.create(payload);
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

  static async getWishlistsByUser(req: Request, res: Response) {
    try {
      // @ts-ignore: Suppress TS error for non-existent property
      const user = req.payload.aud;
      const filters = { ...req.query, user: user };

      const response = await WishlistsService.getWishlists(filters);
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

  static async getWishlistsByUserIdByProductId(req: Request, res: Response) {
    try {
      // @ts-ignore: Suppress TS error for non-existent property
      const user = req.payload.aud;
      const productId = req.params.productId;
      const filters = { ...req.query, user: user, product: productId };

      const response = await WishlistsService.getWishlists(filters);

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

  // TODO: A tester
  static async getAllWishlists(req: Request, res: Response) {
    try {
      const filters = req.query;
      const response = await WishlistsService.getAllWishlists(filters);
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

  // TODO: A tester
  static async getWishlistsById(req: Request, res: Response) {
    try {
      const wishlistId = req.params.id;

      const response = await WishlistsService.findById(wishlistId);

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

  static async deleteWishlists(req: Request, res: Response) {
    try {
      const wishlistId = req.params.id;

      const response = await WishlistsService.deleteById(wishlistId);

      if (!response.success) {
        throw response.error;
      }

      ApiResponse.success(
        res,
        { ...response, message: 'the wishlist has been successfully removed' },
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
