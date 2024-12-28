/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ApiResponse,
  ErrorResponseType,
} from '@nodesandbox/repo-framework/dist/handlers';
import { NextFunction, Request, Response } from 'express';
import { extractResponseData, sanitize } from 'helpers';
import { AuthService } from 'modules/authz/authentication/services';
import {
  createGenerateLoginOtpDto,
  createLoginWithOtpDto,
  createUserRequestDto,
  createVerifyAccountDto,
  forgotPasswordDto,
  logoutDto,
  refreshTokenDto,
  resetPasswordDto,
  userResponseDto,
} from '../dtos';

class UserController {
  static async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const _payload = sanitize(req.body, createUserRequestDto);
      const response = await AuthService.register(_payload.data);

      if (!response.success) {
        throw response.error;
      }

      const responseData = sanitize(
        extractResponseData(userResponseDto, response?.data?.user),
        userResponseDto,
      );

      if (!responseData.success) {
        throw responseData.error;
      }

      ApiResponse.success(res, responseData, 201);
    } catch (error) {
      ApiResponse.error(res, error as ErrorResponseType);
    }
  }

  static async verifyAccount(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const _payload = sanitize(req.body, createVerifyAccountDto);

      if (!_payload.success) {
        throw _payload.error;
      }

      const response = await AuthService.verifyAccount(_payload.data);
      if (response.success) {
        ApiResponse.success(res, response);
      } else {
        throw response;
      }
    } catch (error) {
      ApiResponse.error(res, error as ErrorResponseType);
    }
  }

  static async loginWithPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const response = await AuthService.loginWithPassword(req.body);
      if (response.success) {
        ApiResponse.success(res, response);
      } else {
        throw response;
      }
    } catch (error) {
      ApiResponse.error(res, error as ErrorResponseType);
    }
  }

  static async generateLoginOtp(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const _payload = sanitize(req.body, createGenerateLoginOtpDto);
      if (!_payload.success) {
        throw _payload.error;
      }

      const response = await AuthService.generateLoginOtp(_payload.data);
      if (response.success) {
        ApiResponse.success(res, response);
      } else {
        throw response;
      }
    } catch (error) {
      ApiResponse.error(res, error as ErrorResponseType);
    }
  }

  static async loginWithOtp(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const _payload = sanitize(req.body, createLoginWithOtpDto);
      if (!_payload.success) {
        throw _payload.error;
      }

      const response = await AuthService.loginWithOtp(req.body);
      if (response.success) {
        ApiResponse.success(res, response);
      } else {
        throw response;
      }
    } catch (error) {
      ApiResponse.error(res, error as ErrorResponseType);
    }
  }

  static async refreshToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const _payload = sanitize(req.body, refreshTokenDto);

      if (!_payload.success) {
        throw _payload.error;
      }

      const response = await AuthService.refresh(_payload.data);
      if (response.success) {
        ApiResponse.success(res, response);
      } else {
        throw response;
      }
    } catch (error) {
      ApiResponse.error(res, error as ErrorResponseType);
    }
  }

  static async logout(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const _payload = sanitize(req.body, logoutDto);
      if (!_payload.success) {
        throw _payload.error;
      }
      const response = await AuthService.logout(_payload.data);
      if (response.success) {
        ApiResponse.success(res, response, 202);
      } else {
        throw response;
      }
    } catch (error) {
      ApiResponse.error(res, error as ErrorResponseType);
    }
  }

  static async forgotPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const _payload = sanitize(req.body, forgotPasswordDto);
      if (!_payload.success) {
        throw _payload.error;
      }
      const response = await AuthService.forgotPassword(_payload.data);
      if (response.success) {
        ApiResponse.success(res, response);
      } else {
        throw response;
      }
    } catch (error) {
      ApiResponse.error(res, error as ErrorResponseType);
    }
  }

  static async resetPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const _payload = sanitize(req.body, resetPasswordDto);

      if (!_payload.success) {
        throw _payload.error;
      }

      const response = await AuthService.resetPassword(_payload.data);
      if (response.success) {
        ApiResponse.success(res, response);
      } else {
        throw response;
      }
    } catch (error) {
      ApiResponse.error(res, error as ErrorResponseType);
    }
  }
}

export default UserController;
