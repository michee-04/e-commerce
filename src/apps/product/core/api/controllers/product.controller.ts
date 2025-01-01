/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiResponse } from '@nodesandbox/repo-framework/dist/handlers';
import { NextFunction, Request, Response } from 'express';
import { sanitize } from 'helpers';
import { ProductService } from '../../business';
import { createProductRequestDto, updateProductRequestDto } from '../dtos';

export class ProductController {
  static async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const _payload = sanitize(req.body, createProductRequestDto);
      if (!_payload.success) {
        throw _payload.error;
      }

      const response = await ProductService.createProduct(_payload.data);

      if (!response.success) {
        throw response.error;
      }

      ApiResponse.success(res, response.data, 201);
    } catch (error) {
      ApiResponse.error(res, {
        success: false,
        error: error as any,
      });
    }
  }

  static async getProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const filters = req.query;
      const response = await ProductService.getProduct(filters);
      if (!response.success) {
        throw response.error;
      }

      ApiResponse.success(res, response, 200);
    } catch (error) {
      ApiResponse.error(res, {
        success: false,
        error: error as any,
      });
    }
  }

  static async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const productId = req.params.id;

      const response = await ProductService.findById(productId);

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

  static async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const productId = req.params.id;
      const _payload = sanitize(req.body, updateProductRequestDto);
      const image = req.file;

      if (!_payload.success) {
        throw _payload.error;
      }

      const response = await ProductService.updateById(
        productId,
        _payload.data,
      );

      if (!response.success) {
        throw response.error;
      }

      ApiResponse.success(
        res,
        { ...response, message: 'The product has been successfully modified' },
        202,
      );
    } catch (error) {
      ApiResponse.error(res, {
        success: false,
        error: error as any,
      });
    }
  }

  static async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const productId = req.params.id;

      const response = await ProductService.deleteById(productId);

      if (!response.success) {
        throw response.error;
      }

      ApiResponse.success(
        res,
        { ...response, message: 'the product has been successfully removed' },
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
