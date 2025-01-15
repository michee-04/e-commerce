/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiResponse } from '@nodesandbox/response-kit';
import { NextFunction, Request, Response } from 'express';
import { sanitize } from 'helpers';
import { ProductAttributeService } from '../../business';
import {
  createProductAttributeReauestDto,
  updateProductAttributeReauestDto,
} from '../dtos';

export class ProductAttributeController {
  static async createProductAttribute(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const _payload = sanitize(req.body, createProductAttributeReauestDto);

      if (!_payload.success) {
        throw _payload.error;
      }

      const response = await ProductAttributeService.create(_payload.data);

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

  static async getProductAttribute(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const filters = req.query;
      const response =
        await ProductAttributeService.getProductAttribute(filters);
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

  static async getCategoryById(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const productAttributeId = req.params.id;

      const response =
        await ProductAttributeService.findById(productAttributeId);

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

  static async updateProductAttribute(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const productAttributeId = req.params.id;
      const _payload = sanitize(req.body, updateProductAttributeReauestDto);
      const image = req.file;

      if (!_payload.success) {
        throw _payload.error;
      }

      const response = await ProductAttributeService.updateById(
        productAttributeId,
        _payload.data,
      );

      if (!response.success) {
        throw response.error;
      }

      ApiResponse.success(
        res,
        {
          ...response,
          message: 'the product attribute has been successfully modified',
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

  static async deleteProductAttribute(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const productAttributeId = req.params.id;

      const response =
        await ProductAttributeService.deleteById(productAttributeId);

      if (!response.success) {
        throw response.error;
      }

      ApiResponse.success(
        res,
        {
          ...response,
          message: 'the product attribute has been successfully removed',
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
}
