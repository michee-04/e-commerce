import { ApiResponse, ErrorResponse } from '@nodesandbox/response-kit';
import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';

export const validateRequest = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const { details } = error;
      const message = details.map((i) => i.message).join(',');
      const errorResponse = new ErrorResponse({
        code: 'VALIDATION_ERROR',
        message: `${message}`,
      });
      LOGGER.error(errorResponse.message, error);
      return ApiResponse.error(res, {
        success: false,
        error: {
          message: errorResponse.message,
          suggestions: errorResponse.suggestions,
          statusCode: errorResponse.statusCode,
        } as any,
      });
    } else {
      next();
    }
  };
};
