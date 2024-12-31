/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiResponse } from '@nodesandbox/repo-framework/dist/handlers';
import { NextFunction, Request, Response } from 'express';
import { extractResponseData, sanitize } from 'helpers';
import { AuthService } from 'modules/authz/authentication/services';
import {
  adminRequestDto,
  createGenerateLoginOtpDto,
  createLoginWithOtpDto,
  createLoginWithPasswordDto,
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
      ApiResponse.error(res, {
        success: false,
        error: error as any,
      });
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

      const response = await AuthService.verifyAccount(_payload.data);
      if (response.success) {
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
      const response = await AuthService.loginWithPassword(req.body);

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

      const response = await AuthService.generateLoginOtp(_payload.data);
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

  static async loginWithOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const _payload = sanitize(req.body, createLoginWithOtpDto);
      if (!_payload.success) {
        throw _payload.error;
      }

      const response = await AuthService.loginWithOtp(_payload.data);
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

  static async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const _payload = sanitize(req.body, refreshTokenDto);

      if (!_payload.success) {
        throw _payload.error;
      }

      const response = await AuthService.refresh(_payload.data);
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

  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const _payload = sanitize(req.body, logoutDto);
      if (!_payload.success) {
        throw _payload.error;
      }
      const response = await AuthService.logout(_payload.data);
      if (!response.success) {
        throw response.error;
      }
      ApiResponse.success(res, response, 202);
    } catch (error) {
      ApiResponse.error(res, {
        success: false,
        error: error as any,
      });
    }
  }

  static async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const _payload = sanitize(req.body, forgotPasswordDto);
      if (!_payload.success) {
        throw _payload.error;
      }
      const response = await AuthService.forgotPassword(_payload.data);
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

  static async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const _payload = sanitize(req.body, resetPasswordDto);

      if (!_payload.success) {
        throw _payload.error;
      }

      const response = await AuthService.resetPassword(_payload.data);
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
}

export default AdminController;
