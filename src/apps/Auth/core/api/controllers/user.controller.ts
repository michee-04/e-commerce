/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ApiResponse,
  ErrorResponseType,
} from '@nodesandbox/repo-framework/dist/handlers';
import { NextFunction, Request, Response } from 'express';
import { extractResponseData, sanitize } from 'helpers';
import { AuthService } from 'modules/authz/authentication/services';
import {
  createUserRequestDto,
  createVerifyAccountDto,
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
      const response = await AuthService.generateLoginOtp(req.body.email);
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
      const response = await AuthService.refresh(req.body.refreshToken);
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
      const { accessToken, refreshToken } = req.body;
      const response = await AuthService.logout(accessToken, refreshToken);
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
      const response = await AuthService.forgotPassword(req.body.email);
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
      const response = await AuthService.resetPassword(req.body);
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
