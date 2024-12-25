import {
  ErrorResponse,
  ErrorResponseType,
  SuccessResponseType,
} from '@nodesandbox/repo-framework/dist/handlers';
import { AuthenticationStrategies } from 'modules/authz/authentication/strategies';
import { OTPService, UserService } from 'modules/features/actions';
import { IOTPModel } from 'modules/features/actions/otp/types';
import { MailServiceUtilities } from 'modules/shared/notificator/mail';

class AuthService {
  async register(payload: any) {
    try {
      const { email } = payload;
      const userResponse = await UserService.exists({ email: email });

      if (userResponse === true) {
        throw new ErrorResponse({
          code: 'UNIQUE_FIELD_ERROR',
          message: 'The entered email is already registered.',
          statusCode: 409,
        });
      }

      const createUserResponse = (await UserService.create(payload)) as any;

      if (!createUserResponse.success || !createUserResponse.data?.docs) {
        throw createUserResponse.error;
      }

      await MailServiceUtilities.sendAccountCreationEmail({
        to: email,
        firstname: createUserResponse.data.docs.firstname,
      });

      const otpResponse = (await OTPService.generate(
        email,
        CONFIG.otp.purposes.ACCOUNT_VERIFICATION.code,
      )) as any;

      if (!otpResponse.success) {
        throw otpResponse.error;
      }

      return {
        success: true,
        data: {
          user: createUserResponse.data.docs,
          otp: otpResponse.document,
        },
      };
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

  async verifyAccount(
    payload: any,
  ): Promise<SuccessResponseType<null> | ErrorResponseType> {
    try {
      const { email, code } = payload;
      const userResponse = (await UserService.findOne({
        email,
      })) as any;

      if (!userResponse.success || !userResponse.data?.docs) {
        throw new ErrorResponse({
          code: 'NOT_FOUND_ERROR',
          message: 'User not found.',
          statusCode: 404,
        });
      }

      if (userResponse.data.docs.verified) {
        return { success: true }; // If already verified, return success without further actions
      }

      const validateOtpResponse = await OTPService.validate(
        email,
        code,
        CONFIG.otp.purposes.ACCOUNT_VERIFICATION.code,
      );

      if (!validateOtpResponse.success) {
        throw validateOtpResponse.error;
      }

      const verifyUserResponse = await UserService.markAsVerified(email);

      if (!verifyUserResponse.success) {
        throw verifyUserResponse.error;
      }

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

  async generateLoginOtp(
    payload: any,
  ): Promise<SuccessResponseType<IOTPModel> | ErrorResponseType> {
    try {
      const { email } = payload;
      const userResponse = (await UserService.findOne({
        email,
      })) as any;

      if (!userResponse.success || !userResponse.data?.docs) {
        throw new ErrorResponse({
          code: 'NOT_FOUND_ERROR',
          message: 'User not found.',
          statusCode: 404,
        });
      }

      const user = userResponse.data.docs;

      if (!user.verified) {
        throw new ErrorResponse({
          code: 'UNAUTHORIZED',
          message: 'Unverified account.',
          statusCode: 401,
        });
      }

      if (!user.active) {
        throw new ErrorResponse({
          code: 'FORBIDDEN',
          message: 'Inactive account, please contact admins.',
          statusCode: 403,
        });
      }

      const otpResponse = await OTPService.generate(
        email,
        CONFIG.otp.purposes.LOGIN_CONFIRMATION.code,
      );

      if (!otpResponse.success) {
        throw otpResponse.error;
      }

      return { success: true, data: otpResponse };
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

  async loginWithPassword(
    payload: any,
  ): Promise<SuccessResponseType<any> | ErrorResponseType> {
    try {
      const { email, password } = payload;
      const userResponse = (await UserService.findOne({
        email,
      })) as any;

      if (!userResponse.success || !userResponse.data?.docs) {
        throw new ErrorResponse({
          code: 'UNAUTHORIZED',
          message: 'Invalid credentials.',
          statusCode: 401,
        });
      }

      const user = userResponse.data.docs;
      const isValidPasswordResponse = (await UserService.isvalidPassword(
        user.id,
        password,
      )) as SuccessResponseType<{ isValid: boolean }>;

      if (
        !isValidPasswordResponse.success
        // !isValidPasswordResponse.data?.docs?.isValid
      ) {
        throw new ErrorResponse({
          code: 'UNAUTHORIZED',
          message: 'Invalid credentials.',
          statusCode: 401,
        });
      }

      if (!user.verified) {
        throw new ErrorResponse({
          code: 'UNAUTHORIZED',
          message: 'Unverified account.',
          statusCode: 401,
        });
      }

      if (!user.active) {
        throw new ErrorResponse({
          code: 'FORBIDDEN',
          message: 'Inactive account, please contact admins.',
          statusCode: 403,
        });
      }

      const accessToken = await AuthenticationStrategies.jwt.signAccessToken(
        user.id,
      );
      const refreshToken = await AuthenticationStrategies.jwt.signRefreshToken(
        user.id,
      );

      return {
        success: true,
        data: {
          token: { access: accessToken, refresh: refreshToken },
          user,
        },
      };
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

  async loginWithOtp(
    payload: any,
  ): Promise<SuccessResponseType<any> | ErrorResponseType> {
    try {
      const { email, code } = payload;
      const userResponse = (await UserService.findOne({
        email,
      })) as any;

      if (!userResponse.success || !userResponse.data?.docs) {
        throw new ErrorResponse({
          code: 'UNAUTHORIZED',
          message: 'Invalid credentials.',
          statusCode: 401,
        });
      }

      const user = userResponse.data.docs;

      const validateOtpResponse = await OTPService.validate(
        email,
        code,
        CONFIG.otp.purposes.LOGIN_CONFIRMATION.code,
      );

      if (!validateOtpResponse.success) {
        throw validateOtpResponse.error;
      }

      if (!user.verified) {
        throw new ErrorResponse({
          code: 'UNAUTHORIZED',
          message: 'Unverified account.',
          statusCode: 401,
        });
      }

      if (!user.active) {
        throw new ErrorResponse({
          code: 'FORBIDDEN',
          message: 'Inactive account, please contact admins.',
          statusCode: 403,
        });
      }

      const accessToken = await AuthenticationStrategies.jwt.signAccessToken(
        user.id,
      );
      const refreshToken = await AuthenticationStrategies.jwt.signRefreshToken(
        user.id,
      );

      return {
        success: true,
        data: {
          token: { access: accessToken, refresh: refreshToken },
          user,
        },
      };
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

  async refresh(
    payload: any,
  ): Promise<SuccessResponseType<any> | ErrorResponseType> {
    try {
      const { refreshToken } = payload;
      if (!refreshToken) {
        throw new ErrorResponse({
          code: 'BAD_REQUEST',
          message: 'Refresh token is required.',
          statusCode: 400,
        });
      }

      const userId =
        await AuthenticationStrategies.jwt.verifyRefreshToken(refreshToken);
      const accessToken =
        await AuthenticationStrategies.jwt.signAccessToken(userId);
      // Refresh token change to ensure rotation
      const newRefreshToken =
        await AuthenticationStrategies.jwt.signRefreshToken(userId);

      return {
        success: true,
        data: { token: { access: accessToken, refresh: newRefreshToken } },
      };
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

  async logout(
    payload: any,
  ): Promise<SuccessResponseType<null> | ErrorResponseType> {
    try {
      const { accessToken, refreshToken } = payload;

      if (!refreshToken || !accessToken) {
        throw new ErrorResponse({
          code: 'BAD_REQUEST',
          message: 'Refresh and access token are required.',
          statusCode: 400,
        });
      }

      const { userId: userIdFromRefresh } =
        await AuthenticationStrategies.jwt.checkRefreshToken(refreshToken);
      const { userId: userIdFromAccess } =
        await AuthenticationStrategies.jwt.checkAccessToken(accessToken);

      if (userIdFromRefresh !== userIdFromAccess) {
        throw new ErrorResponse({
          code: 'UNAUTHORIZED',
          message: 'Access token does not match refresh token.',
          statusCode: 401,
        });
      }

      // Blacklist the access token
      await AuthenticationStrategies.jwt.blacklistToken(accessToken);

      // Remove the refresh token from Redis
      await AuthenticationStrategies.jwt.removeFromRedis(userIdFromRefresh);

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

  async forgotPassword(
    payload: any,
  ): Promise<SuccessResponseType<null> | ErrorResponseType> {
    try {
      const { email } = payload;
      if (!email) {
        throw new ErrorResponse({
          code: 'BAD_REQUEST',
          message: 'Email should be provided.',
          statusCode: 400,
        });
      }

      const userResponse = (await UserService.findOne({
        email,
      })) as any;

      if (!userResponse.success || !userResponse.data?.docs) {
        throw new ErrorResponse({
          code: 'NOT_FOUND_ERROR',
          message: 'User not found.',
          statusCode: 404,
        });
      }

      const user = userResponse.data.docs;

      if (!user.verified) {
        throw new ErrorResponse({
          code: 'UNAUTHORIZED',
          message: 'Unverified account.',
        });
      }

      if (!user.active) {
        throw new ErrorResponse({
          code: 'FORBIDDEN',
          message: 'Inactive account, please contact admins.',
          statusCode: 403,
        });
      }

      const otpResponse = await OTPService.generate(
        email,
        CONFIG.otp.purposes.FORGOT_PASSWORD.code,
      );

      if (!otpResponse.success) {
        throw otpResponse.error;
      }

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

  async resetPassword(
    payload: any,
  ): Promise<SuccessResponseType<null> | ErrorResponseType> {
    try {
      // We suppose a verification about new password and confirmation password have already been done
      const { email, code, newPassword } = payload;
      const userResponse = (await UserService.findOne({
        email,
      })) as any;

      if (!userResponse.success || !userResponse.data?.docs) {
        throw new ErrorResponse({
          code: 'NOT_FOUND_ERROR',
          message: 'User not found.',
          statusCode: 404,
        });
      }

      const user = userResponse.data.docs;

      if (!user.verified) {
        throw new ErrorResponse({
          code: 'UNAUTHORIZED',
          message: 'Unverified account.',
          statusCode: 401,
        });
      }

      if (!user.active) {
        throw new ErrorResponse({
          code: 'FORBIDDEN',
          message: 'Inactive account, please contact admins.',
          statusCode: 403,
        });
      }

      const validateOtpResponse = await OTPService.validate(
        email,
        code,
        CONFIG.otp.purposes.FORGOT_PASSWORD.code,
      );

      if (!validateOtpResponse.success) {
        throw validateOtpResponse.error;
      }

      const updatePasswordResponse = await UserService.updatePassword(
        user.id,
        newPassword,
      );

      if (!updatePasswordResponse.success) {
        throw updatePasswordResponse.error;
      }

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

export default new AuthService();
