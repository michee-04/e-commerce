/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ErrorResponse,
  ErrorResponseType,
} from '@nodesandbox/repo-framework/dist/handlers';
import { ApiResponse } from '@nodesandbox/response-kit';
import { NextFunction, Request, Response } from 'express';
import { extractResponseData, sanitize } from 'helpers';
import { AuthService } from 'modules/authz/authentication/services';
import {
  adminRequestDto,
  createGenerateLoginOtpDto,
  createLoginWithOtpDto,
  createLoginWithPasswordDto,
  createUserRequestDto,
  createVerifyAccountDto,
  forgotPasswordDto,
  logoutDto,
  refreshTokenDto,
  resetPasswordDto,
  userResponseDto,
} from '../dtos';

class AdminController {
  static async registerAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const _payload = sanitize(req.body, adminRequestDto);
      // console.log('⚡⚡⚡⚡⚡⚡⚡ : ', _payload);

      if (!_payload.success) {
        throw _payload.error;
      }

      const response = await AuthService.register(_payload.data);

      if (!response.success) {
        throw response.error;
      }

      const responseData = sanitize(
        extractResponseData(userResponseDto, response?.data?.user),
        userResponseDto,
      ) as any;

      if (!responseData.success) {
        throw responseData.error;
      }

      ApiResponse.success(res, responseData, 201);
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
      console.log('⚡⚡⚡⚡⚡⚡ : ', error);

      ApiResponse.error(res, error as any);
    }
  }

  static async verifyAccountAdmin(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const _payload = sanitize(req.body, createVerifyAccountDto);

      if (!_payload.success) {
        throw _payload.error;
      }

      const response = (await AuthService.verifyAccount(_payload.data)) as any;
      if (response.success) {
        ApiResponse.success(res, response);
      } else {
        throw response;
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
      console.log('⚡⚡⚡⚡⚡⚡ : ', error);

      ApiResponse.error(res, error as any);
    }
  }

  static async loginWithPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const _payload = sanitize(req.body, createLoginWithPasswordDto);
      if (!_payload.success) {
        throw _payload.error;
      }
      const response = (await AuthService.loginWithPassword(req.body)) as any;
      if (response.success) {
        ApiResponse.success(res, response);
      } else {
        throw response;
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
      console.log('⚡⚡⚡⚡⚡⚡ : ', error);

      ApiResponse.error(res, error as any);
    }
  }

  static async generateLoginOtp(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const _payload = sanitize(req.body, createGenerateLoginOtpDto);
      if (!_payload.success) {
        throw _payload.error;
      }

      const response = (await AuthService.generateLoginOtp(
        _payload.data,
      )) as any;
      if (response.success) {
        ApiResponse.success(res, response);
      } else {
        throw response;
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
      console.log('⚡⚡⚡⚡⚡⚡ : ', error);

      ApiResponse.error(res, error as any);
    }
  }

  static async loginWithOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const _payload = sanitize(req.body, createLoginWithOtpDto);
      if (!_payload.success) {
        throw _payload.error;
      }

      const response = (await AuthService.loginWithOtp(req.body)) as any;
      if (response.success) {
        ApiResponse.success(res, response);
      } else {
        throw response;
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
      console.log('⚡⚡⚡⚡⚡⚡ : ', error);

      ApiResponse.error(res, error as any);
    }
  }

  static async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const _payload = sanitize(req.body, refreshTokenDto);

      if (!_payload.success) {
        throw _payload.error;
      }

      const response = (await AuthService.refresh(_payload.data)) as any;
      if (response.success) {
        ApiResponse.success(res, response);
      } else {
        throw response;
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
      console.log('⚡⚡⚡⚡⚡⚡ : ', error);

      ApiResponse.error(res, error as any);
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const _payload = sanitize(req.body, logoutDto);
      if (!_payload.success) {
        throw _payload.error;
      }
      const response = (await AuthService.logout(_payload.data)) as any;
      if (response.success) {
        ApiResponse.success(res, response, 202);
      } else {
        throw response;
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
      console.log('⚡⚡⚡⚡⚡⚡ : ', error);

      ApiResponse.error(res, error as any);
    }
  }

  static async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const _payload = sanitize(req.body, forgotPasswordDto);
      if (!_payload.success) {
        throw _payload.error;
      }
      const response = (await AuthService.forgotPassword(_payload.data)) as any;
      if (response.success) {
        ApiResponse.success(res, response);
      } else {
        throw response;
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
      console.log('⚡⚡⚡⚡⚡⚡ : ', error);

      ApiResponse.error(res, error as any);
    }
  }

  static async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const _payload = sanitize(req.body, resetPasswordDto);

      if (!_payload.success) {
        throw _payload.error;
      }

      const response = (await AuthService.resetPassword(_payload.data)) as any;
      if (response.success) {
        ApiResponse.success(res, response);
      } else {
        throw response;
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
      console.log('⚡⚡⚡⚡⚡⚡ : ', error);

      ApiResponse.error(res, error as any);
    }
  }
}

export default AdminController;
