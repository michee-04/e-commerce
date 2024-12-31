/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ApiResponse,
  ErrorResponseType,
} from '@nodesandbox/repo-framework/dist/handlers';
import FileService from 'apps/files/core/business/services/file.service';
import { NextFunction, Request, Response } from 'express';
import * as fs from 'fs';
import { sanitize } from 'helpers';
import categoryService from '../../business/services/category.service';
import { CreateCategoryRequestDto, UpdateRequestDto } from '../dtos';

export class categoryController {
  static async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const _payload = sanitize(req.body, CreateCategoryRequestDto);
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

      const response = await categoryService.createCategory(_payload.data);

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

  static async getCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const filters = req.query;
      const response = await categoryService.getCategory(filters);
      if (!response.success) {
        throw response.error;
      }

      ApiResponse.success(res, response);
    } catch (error) {
      ApiResponse.error(res, error as ErrorResponseType);
    }
  }

  static async getCategoryById(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const categoryId = req.params.id;

      const response = await categoryService.findById(categoryId);

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

  static async updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const categoryId = req.params.id;
      const _payload = sanitize(req.body, UpdateRequestDto);
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

      const response = await categoryService.updateById(
        categoryId,
        _payload.data,
      );

      if (!response.success) {
        throw response.error;
      }

      ApiResponse.success(
        res,
        { ...response, message: 'the category has been successfully modified' },
        202,
      );
    } catch (error) {
      ApiResponse.error(res, {
        success: false,
        error: error as any,
      });
    }
  }

  static async downloadCategoryImage(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const imageId = req.params.id;

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

  static async deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const categoryId = req.params.id;

      const response = await categoryService.deleteById(categoryId);

      if (!response.success) {
        throw response.error;
      }

      ApiResponse.success(
        res,
        { ...response, message: 'the category has been successfully removed' },
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
