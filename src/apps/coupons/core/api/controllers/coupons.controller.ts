import { ApiResponse } from '@nodesandbox/response-kit';
import { Request, Response } from 'express';
import { sanitize } from 'helpers';
import { CouponsService } from '../../business';
import { CouponsRequestDto } from '../dtos';

export class CouponsController {
  static async createCoupn(req: Request, res: Response) {
    try {
      //
      const payload = sanitize(req.body, CouponsRequestDto);
      if (!payload.success) {
        throw payload.error;
      }

      const response = await CouponsService.createCoupon(payload);
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

  static async getCoupons(req: Request, res: Response) {
    try {
      const filters = req.query;
      const response = await CouponsService.getCoupons(filters);
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

  static async getCouponsId(req: Request, res: Response) {
    try {
      const couponId = req.params.id;

      const response = await CouponsService.findById(couponId);

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
  static async updateCoupon(req: Request, res: Response) {
    try {
      const couponId = req.params.id;
      const _payload = sanitize(req.body, CouponsRequestDto);

      if (!_payload.success) {
        throw _payload.error;
      }

      const response = await CouponsService.updateById(couponId, _payload.data);

      if (!response.success) {
        throw response.error;
      }

      ApiResponse.success(
        res,
        { ...response, message: 'the coupon has been successfully modified' },
        202,
      );
    } catch (error) {
      ApiResponse.error(res, {
        success: false,
        error: error as any,
      });
    }
  }

  static async deleteCoupon(req: Request, res: Response) {
    try {
      const couponId = req.params.id;

      const response = await CouponsService.deleteById(couponId);

      if (!response.success) {
        throw response.error;
      }

      ApiResponse.success(
        res,
        { ...response, message: 'the coupon has been successfully removed' },
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
