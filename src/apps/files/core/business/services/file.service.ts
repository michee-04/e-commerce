import { BaseService } from '@nodesandbox/repo-framework';
import {
  ErrorResponse,
  ErrorResponseType,
  SuccessResponseType,
} from '@nodesandbox/response-kit';
import { encryptAES } from 'helpers';
import { storage } from 'modules/shared/storage';
import { FileModel, IFileModel } from '../../domain';
import { FileRepository } from '../repositories';

class FileService extends BaseService<IFileModel, FileRepository> {
  constructor() {
    const fileRepo = new FileRepository(FileModel);

    super(fileRepo, {
      filter: {
        allowedFields: ['type', 'storageType'],
        defaultSort: { createdAt: -1 },
      },
      search: {
        enabled: true,
        fields: ['name', 'extension', 'size', 'type'],
        caseSensitive: false,
        fuzzySearch: false,
      },
    });
  }

  async createFIle(
    file: any,
  ): Promise<SuccessResponseType<IFileModel> | ErrorResponseType> {
    try {
      const meta = file;

      await storage.minio.createBucket(CONFIG.minio.bucketName);
      const payload = await storage.minio.uploadBuffer(
        CONFIG.minio.bucketName,
        meta.originalname,
        meta.buffer,
        { ...meta, buffer: undefined },
      );

      const hashedName = encryptAES(
        meta.originalname,
        process.env.ENCRYPTAGE_KEY || 'secret-key',
      );
      const insertFile = {
        hash: hashedName,
        size: meta.size,
        type: meta.mimetype,
        metadata: meta,
        url: payload.data,
      };

      // const response = await this.repository.create(insertFile);
      const response = await this.repository.create(insertFile);

      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof ErrorResponse
            ? error
            : new ErrorResponse({
                code: 'INTERNAL_SERVER_ERROR',
                message: (error as Error).message,
                statusCode: 500,
              }),
      };
    }
  }

  async getFile(
    fileId: any,
  ): Promise<SuccessResponseType<IFileModel> | ErrorResponseType> {
    try {
      console.log('❌❌❌❌❌❌');
      const file = await this.repository.findOne({ _id: fileId });

      if (!file) {
        throw file;
      }

      file.originalname = (
        file.metadata as { originalname: string }
      ).originalname;
      const { originalname } = file;

      const payload = await storage.minio.getFileStats(
        CONFIG.minio.bucketName,
        originalname,
      );

      return { success: true, data: payload };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof ErrorResponse
            ? error
            : new ErrorResponse({
                code: 'INTERNAL_SERVER_ERROR',
                message: (error as Error).message,
                statusCode: 500,
              }),
      };
    }
  }

  async sendFile(
    fileId: any,
  ): Promise<SuccessResponseType<IFileModel> | ErrorResponseType> {
    try {
      const file = await this.repository.findOne({ _id: fileId });

      if (!file) {
        throw file;
      }

      file.originalname = (
        file.metadata as { originalname: string }
      ).originalname;
      const { originalname } = file;

      const payload = await storage.minio.downloadFile(
        CONFIG.minio.bucketName,
        originalname,
        file.url,
      );

      const response = {
        path: payload.data?.path,
        mimetype: file.type,
        size: file.size,
      } as any;

      return { success: true, data: response };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof ErrorResponse
            ? error
            : new ErrorResponse({
                code: 'INTERNAL_SERVER_ERROR',
                message: (error as Error).message,
                statusCode: 500,
              }),
      };
    }
  }

  async deleteFile(
    fileId: any,
  ): Promise<SuccessResponseType<IFileModel> | ErrorResponseType> {
    try {
      const file = await this.repository.findOne({ _id: fileId });

      if (!file) {
        throw file;
      }

      file.originalname = (
        file.metadata as { originalname: string }
      ).originalname;
      const { originalname } = file;

      const payload = await storage.minio.deleteSingleFile(
        CONFIG.minio.bucketName,
        originalname,
      );

      if (!payload) {
        throw payload;
      }

      await this.repository.delete({ _id: fileId });

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof ErrorResponse
            ? error
            : new ErrorResponse({
                code: 'INTERNAL_SERVER_ERROR',
                message: (error as Error).message,
                statusCode: 500,
              }),
      };
    }
  }
}

export default FileService;
