import { BaseModel, createBaseSchema } from '@nodesandbox/repo-framework';
import { FILE_MODEL_NAME } from 'modules/shared/constants';
import { IFileModel } from '../types';

const fileSchema = createBaseSchema<IFileModel>(
  {
    hash: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    extension: {
      type: String,
      required: false,
    },
    size: {
      type: Number,
      required: true,
    },
    locationData: {
      path: { type: String },
      minio: {
        bucket: { type: String },
        objectName: { type: String },
      },
    },
    url: {
      type: String,
    },
    presignedUrlExpiration: {
      type: Date,
    },
    metadata: {
      fieldname: {
        type: String,
        required: true,
      },
      originalname: {
        type: String,
        required: true,
      },
      encoding: {
        type: String,
        required: true,
      },
      mimetype: {
        type: String,
        required: true,
      },
    },
    downloadCount: {
      type: Number,
    },
  },
  {
    modelName: FILE_MODEL_NAME,
  },
);

const FileModel = new BaseModel<IFileModel>(
  FILE_MODEL_NAME,
  fileSchema,
).getModel();

export { FileModel, fileSchema };
