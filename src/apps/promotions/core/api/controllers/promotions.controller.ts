import { ApiResponse } from '@nodesandbox/response-kit';
import { Request, Response } from 'express';
import { sanitize } from 'helpers';
import { PromotionsService } from '../../business';
import { PtomotionRequestDto } from '../dtos';

export class PromotioonsController {
  static async createPromotoions(req: Request, res: Response) {
    try {
      //
      const product = req.params.productId;
      const payload = sanitize(req.body, PtomotionRequestDto);
      if (!payload.success) {
        throw payload.error;
      }

      payload.data.product = product;
      const response = await PromotionsService.create(payload.data);
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

  static async getAllPromotion(req: Request, res: Response) {
    try {
      const filters = req.query;
      const response = await PromotionsService.getPromotions(filters);
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

  static async getPromotionById(req: Request, res: Response) {
    try {
      const promotionsId = req.params.id;

      const response = await PromotionsService.findById(promotionsId);

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

  static async updatePromotion(req: Request, res: Response) {
    try {
      const promotionId = req.params.id;
      const _payload = sanitize(req.body, PtomotionRequestDto);

      if (!_payload.success) {
        throw _payload.error;
      }

      const response = await PromotionsService.updateById(
        promotionId,
        _payload.data,
      );

      if (!response.success) {
        throw response.error;
      }

      ApiResponse.success(
        res,
        {
          ...response,
          message: 'the prompotion has been successfully modified',
        },
        202,
      );
    } catch (error) {
      ApiResponse.error(res, {
        success: false,
        error: error as any,
      });
    }
  }

  static async deletePromotion(req: Request, res: Response) {
    try {
      const promotionsId = req.params.id;

      const response = await PromotionsService.deleteById(promotionsId);

      if (!response.success) {
        throw response.error;
      }

      ApiResponse.success(
        res,
        { ...response, message: 'the promotion has been successfully removed' },
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
