import { ApiResponse } from '@nodesandbox/response-kit';
import FileService from 'apps/files/core/business/services/file.service';
import { Request, Response } from 'express';
import * as fs from 'fs';
import { sanitize } from 'helpers';
import { ProductImageService } from '../../business';
import { ProductImageRequestDto } from '../dtos';

export class ProductImageController {
  static async createProductImage(req: Request, res: Response) {
    try {
      const product = req.params.productId;
      const payload = sanitize(req.body, ProductImageRequestDto);
      const image = req.file;

      if (!payload.success) {
        throw payload.error;
      }

      if (image) {
        const fileService = new FileService();
        const productImage = await fileService.createFIle(image);

        if (!productImage.success) {
          throw productImage.error;
        }

        payload.data.image = productImage?.data?._id;
      }
      payload.data.product = product;

      const response = await ProductImageService.create(payload.data);
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

  static async getProductImage(req: Request, res: Response) {
    try {
      const productId = req.params.productId;

      const filters = { ...req.query, product: productId };
      const response = await ProductImageService.getProductImage(filters);
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

  static async getProductImageById(req: Request, res: Response) {
    try {
      const productImageId = req.params.id;

      const response = await ProductImageService.findById(productImageId);

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

  static async downloadProductImage(req: Request, res: Response) {
    try {
      const imageId = req.params.imageId;

      const fileService = new FileService();
      const response = await fileService.sendFile(imageId);

      if (!response.success) {
        throw response.error;
      }

      // TODO: Corriger le telechargement des vidéos
      res.writeHead(200, {
        'content-type': response.data?.mimetype,
        'content-length': response.data?.size,
      });

      const filepath = response.data?.path as string;
      const file = fs.readFileSync(filepath);
      res.end(file);
    } catch (error) {
      ApiResponse.error(res, {
        success: false,
        error: error as any,
      });
    }
  }

  static async updateProductImage(req: Request, res: Response) {
    try {
      const productImageId = req.params.id;
      const _payload = sanitize(req.body, ProductImageRequestDto);
      const image = req.file;

      if (!_payload.success) {
        throw _payload.error;
      }

      if (image) {
        const fileService = new FileService();
        const categoryImage = await fileService.createFIle(image);

        if (!categoryImage.success) {
          throw categoryImage.error;
        }

        _payload.data.image = categoryImage?.data?._id;
      }

      const response = await ProductImageService.updateById(
        productImageId,
        _payload.data,
      );

      if (!response.success) {
        throw response.error;
      }

      ApiResponse.success(
        res,
        {
          ...response,
          message: 'the product image has been successfully modified',
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

  static async deleteProductImage(req: Request, res: Response) {
    try {
      const productImageId = req.params.id;

      const response = await ProductImageService.deleteById(productImageId);

      if (!response.success) {
        throw response.error;
      }

      ApiResponse.success(
        res,
        {
          ...response,
          message: 'the product image has been successfully removed',
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
