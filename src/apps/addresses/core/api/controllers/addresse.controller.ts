import { ApiResponse } from '@nodesandbox/response-kit';
import { Request, Response } from 'express';
import { sanitize } from 'helpers';
import { AddresseService } from '../../business';
import { AddresseRequestDto } from '../dtos';

export class AddresseController {
  static async createAddresse(req: Request, res: Response) {
    try {
      const user = req.params.userId;
      const payload = sanitize(req.body, AddresseRequestDto);
      if (!payload.success) {
        throw payload.error;
      }

      payload.data.user = user;

      const response = await AddresseService.create(payload.data);
      if (!response.success) {
        throw payload.error;
      }

      ApiResponse.success(res, response, 201);
    } catch (errpr) {
      ApiResponse.error(res, {
        success: false,
        error: errpr as any,
      });
    }
  }

  static async getAddresseUser(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const filters = { ...req.query, user: userId };
      const response = await AddresseService.getAddresse(filters);
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

  static async getAllAddresse(req: Request, res: Response) {
    try {
      const filters = req.query;
      const response = await AddresseService.getAddresse(filters);
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

  static async updateAddresse(req: Request, res: Response) {
    try {
      const addresseId = req.params.id;
      const _payload = sanitize(req.body, AddresseRequestDto);

      if (!_payload.success) {
        throw _payload.error;
      }

      const response = await AddresseService.updateById(
        addresseId,
        _payload.data,
      );

      if (!response.success) {
        throw response.error;
      }

      ApiResponse.success(
        res,
        { ...response, message: 'the addresse has been successfully modified' },
        202,
      );
    } catch (error) {
      ApiResponse.error(res, {
        success: false,
        error: error as any,
      });
    }
  }

  static async deleteAddresse(req: Request, res: Response) {
    try {
      const addresseId = req.params.id;

      const response = await AddresseService.deleteById(addresseId);

      if (!response.success) {
        throw response.error;
      }

      ApiResponse.success(
        res,
        { ...response, message: 'the addresse has been successfully removed' },
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
