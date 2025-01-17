import { ApiResponse } from '@nodesandbox/response-kit';
import { Request, Response } from 'express';
import { sanitize } from 'helpers';
import { SuppliersService } from '../../business';
import { SuppliersRequestDto } from '../dtos';

export class SuppliersController {
  static async createSuppliers(req: Request, res: Response) {
    try {
      //   const user = req.params.userId;
      const payload = sanitize(req.body, SuppliersRequestDto);
      if (!payload.success) {
        throw payload.error;
      }

      //   payload.data.user = user;

      const response = await SuppliersService.create(payload.data);
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

  static async getAllSuppliers(req: Request, res: Response) {
    try {
      const filters = req.query;
      const response = await SuppliersService.getSuppliers(filters);
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

  static async getSupplierById(req: Request, res: Response) {
    try {
      const supplierId = req.params.id;

      const response = await SuppliersService.findById(supplierId);

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

  static async updateSupplier(req: Request, res: Response) {
    try {
      const supplierId = req.params.id;
      const _payload = sanitize(req.body, SuppliersRequestDto);

      if (!_payload.success) {
        throw _payload.error;
      }

      const response = await SuppliersService.updateById(
        supplierId,
        _payload.data,
      );

      if (!response.success) {
        throw response.error;
      }

      ApiResponse.success(
        res,
        { ...response, message: 'the supplier has been successfully modified' },
        202,
      );
    } catch (error) {
      ApiResponse.error(res, {
        success: false,
        error: error as any,
      });
    }
  }

  static async deleteSupplier(req: Request, res: Response) {
    try {
      const supplierId = req.params.id;

      const response = await SuppliersService.deleteById(supplierId);

      if (!response.success) {
        throw response.error;
      }

      ApiResponse.success(
        res,
        { ...response, message: 'the supplier has been successfully removed' },
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
