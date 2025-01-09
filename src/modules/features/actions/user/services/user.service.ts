import { BaseService } from '@nodesandbox/repo-framework';
import {
  ErrorResponseType,
  SuccessResponseType,
} from '@nodesandbox/repo-framework/dist/handlers';
import { PasswordUtils } from 'helpers';
import { UserModel } from '../models';
import { UserRepository } from '../repositories';
import { IUserModel } from '../types';

class UserService extends BaseService<IUserModel, UserRepository> {
  constructor() {
    const userRepo = new UserRepository(UserModel);
    super(userRepo, {
      filter: {
        allowedFields: ['verified', 'active'],
        defaultSort: { createdAt: -1 },
      },
      // slug: {
      //   enabled: true,
      //   sourceField: 'title',
      //   targetField: 'slugger',
      // },
      search: {
        enabled: true,
        fields: ['firstname', 'lastname', 'email'],
        caseSensitive: false,
        fuzzySearch: false,
      },
    });
  }

  async isvalidPassword(
    userId: string,
    password: string,
  ): Promise<SuccessResponseType<{ isValid: boolean }> | ErrorResponseType> {
    try {
      const response = (await this.findOne({
        _id: userId,
      })) as any;

      if (!response.success || !response?.data?.docs) {
        LOGGER.error('Error password check', response);
        throw response.error;
      }

      const userPassword = response.data.docs.password;
      const isValid = await PasswordUtils.comparePassword(
        password,
        userPassword,
      );

      return { success: true, data: { isValid } };
    } catch (error) {
      return {
        success: false,
        error: error as any,
      };
    }
  }

  async updatePassword(
    userId: string,
    newPassword: string,
  ): Promise<SuccessResponseType<IUserModel> | ErrorResponseType> {
    try {
      const response = await this.findOne({
        _id: userId,
      });

      if (!response.success || !response.data?.docs) {
        LOGGER.error('Error password update', response);
        throw response.error;
      }

      const hashedPassword = await PasswordUtils.hashPassword(newPassword);

      const updateResponse = await this.update(
        { _id: userId },
        { password: hashedPassword },
      );

      if (!updateResponse.success) {
        throw updateResponse.error;
      }

      return {
        success: true,
        data: updateResponse.data?.docs,
      };
    } catch (error) {
      return {
        success: false,
        error: error as any,
      };
    }
  }

  async isVerified(
    email: string,
  ): Promise<SuccessResponseType<{ verified: boolean }> | ErrorResponseType> {
    try {
      const response = (await this.findOne({
        email,
      })) as any;

      if (!response.success || !response.data?.docs) {
        throw response.error;
      }

      return {
        success: true,
        data: { verified: response.data.docs.verified },
      };
    } catch (error) {
      return {
        success: false,
        error: error as any,
      };
    }
  }

  async markAsVerified(
    email: string,
  ): Promise<SuccessResponseType<IUserModel> | ErrorResponseType> {
    try {
      const response = (await this.findOne({
        email,
      })) as any;
      if (!response.success) {
        throw response.error;
      }

      const updateResponse = (await this.update(
        { _id: response.data.docs._id },
        { verified: true },
      )) as SuccessResponseType<IUserModel>;

      if (!updateResponse.success) {
        throw updateResponse.error;
      }

      return {
        success: true,
        data: updateResponse.data?.docs,
      };
    } catch (error) {
      return {
        success: false,
        error: error as any,
      };
    }
  }

  async getAllUsers(filters: any) {
    const { page = 1, limit = 10, sort, search = '' } = filters;

    return this.findAll({
      sort: sort as Record<string, 1 | -1>,
      page: parseInt(page),
      limit: parseInt(limit),
      searchTerm: search as string,
    });
  }
}

export default new UserService();
