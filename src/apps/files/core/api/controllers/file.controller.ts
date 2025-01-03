/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorResponse } from '@nodesandbox/repo-framework/dist/handlers';
import {
  ApiResponse,
  ErrorResponseType,
  SuccessResponseType,
} from '@nodesandbox/response-kit';
import { IFileModel } from 'apps/files';
import FileService from 'apps/files/core/business/services/file.service';
import { NextFunction, Request, Response } from 'express';
import fs from 'fs';

export class FileController {
  /**
   * @param req
   * @param res
   * @param next
   */
  static async createFile(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.file;

      const fileService = new FileService();
      const response = (await fileService.createFIle(payload)) as any;
      if (!response.success) {
        throw response.error;
      }

      ApiResponse.success(res, response, 201);
    } catch (error) {
      // TODO: Modification of the repo-framework package for better error handling
      if (error instanceof ErrorResponse) {
        const { code, statusCode, message, suggestions } = error;

        return res.status(statusCode).json({
          error: {
            code: code,
            message: message,
            suggestions: suggestions || [],
          },
        });
      }

      ApiResponse.error(res, error as any);
    }
  }

  /**
   * @param req
   * @param res
   * @param next
   */
  static async getFileById(req: Request, res: Response, next: NextFunction) {
    try {
      const fileId = req.params.fileId;

      const fileService = new FileService();
      const response = (await fileService.getFile(
        fileId,
      )) as SuccessResponseType<IFileModel>;

      if (response.success) {
        ApiResponse.success(res, response);
      } else {
        throw response.error;
      }
    } catch (error) {
      // TODO: Modification of the repo-framework package for better error handling
      if (error instanceof ErrorResponse) {
        const { code, statusCode, message, suggestions } = error;

        return res.status(statusCode).json({
          error: {
            code: code,
            message: message,
            suggestions: suggestions || [],
          },
        });
      }

      ApiResponse.error(res, error as any);
    }
  }

  static async downloadFile(req: Request, res: Response, next: NextFunction) {
    try {
      const fileId = req.params.fileId;

      const fileService = new FileService();
      const response = (await fileService.sendFile(
        fileId,
      )) as SuccessResponseType<IFileModel>;

      if (!response.success) {
        throw response.error;
      }

      // TODO Corriger le telechargement des vidéos
      res.writeHead(200, {
        'content-type': response.document?.mimetype,
        'content-length': response.document?.size,
      });

      const filepath = response.document?.path as string;
      const file = fs.readFileSync(filepath);
      res.end(file);
    } catch (error) {
      // TODO: Modification of the repo-framework package for better error handling
      if (error instanceof ErrorResponse) {
        const { code, statusCode, message, suggestions } = error;

        return res.status(statusCode).json({
          error: {
            code: code,
            message: message,
            suggestions: suggestions || [],
          },
        });
      }

      ApiResponse.error(res, error as any);
    }
  }

  /**
   * @param req
   * @param res
   * @param next
   */
  static async deleteFile(req: Request, res: Response, next: NextFunction) {
    try {
      const fileId = req.params.fileId;

      const fileService = new FileService();
      const response = (await fileService.deleteFile(fileId)) as any;

      if (!response.success) {
        throw response.error;
      }

      ApiResponse.success(res, response, 201);
    } catch (error) {
      // TODO: Modification of the repo-framework package for better error handling
      if (error instanceof ErrorResponse) {
        const { code, statusCode, message, suggestions } = error;

        return res.status(statusCode).json({
          error: {
            code: code,
            message: message,
            suggestions: suggestions || [],
          },
        });
      }

      ApiResponse.error(res, error as any);
    }
  }
}
