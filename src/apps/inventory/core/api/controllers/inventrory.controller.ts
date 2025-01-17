import { ApiResponse } from '@nodesandbox/response-kit';
import { Request, Response } from 'express';
import { sanitize } from 'helpers';
import { InventoryService } from '../../business';
import { InventoryRequestDto } from '../dtos';

export class InventoryController {
  static async createInventory(req: Request, res: Response) {
    try {
      const supplier = req.params.supplierId;
      const product = req.params.productId;

      const payload = sanitize(req.body, InventoryRequestDto);
      if (!payload.success) {
        throw payload.error;
      }

      payload.data = {
        ...payload.data,
        supplier: supplier,
        product: product,
      };

      const response = await InventoryService.create(payload.data);

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

  static async getAllInventory(req: Request, res: Response) {
    try {
      const filters = req.query;
      const response = await InventoryService.getInventory(filters);
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

  static async getInventoryById(req: Request, res: Response) {
    try {
      const inventoryId = req.params.id;

      const response = await InventoryService.findById(inventoryId);

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

  static async updateInventory(req: Request, res: Response) {
    try {
      const inventoryId = req.params.id;
      const _payload = sanitize(req.body, InventoryRequestDto);

      if (!_payload.success) {
        throw _payload.error;
      }

      const response = await InventoryService.updateById(
        inventoryId,
        _payload.data,
      );

      if (!response.success) {
        throw response.error;
      }

      ApiResponse.success(
        res,
        {
          ...response,
          message: 'the inventory has been successfully modified',
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

  static async deleteInventory(req: Request, res: Response) {
    try {
      const inventoryId = req.params.id;

      const response = await InventoryService.deleteById(inventoryId);

      if (!response.success) {
        throw response.error;
      }

      ApiResponse.success(
        res,
        { ...response, message: 'the inventory has been successfully removed' },
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
