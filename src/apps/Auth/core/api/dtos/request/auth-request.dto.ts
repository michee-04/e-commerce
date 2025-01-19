import Joi, { ObjectSchema } from 'joi';

export const createUserRequestDto: ObjectSchema = Joi.object({
  firstname: Joi.string().min(3).required(),
  lastname: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().optional(),
  password: Joi.string().required().min(8),
});

export const adminRequestDto: ObjectSchema = Joi.object({
  firstname: Joi.string().min(3).required(),
  lastname: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().optional(),
  password: Joi.string().required().min(8),
  role: Joi.string().valid('user', 'admin', 'super-admin').default('admin'),
});

export const createVerifyAccountDto: ObjectSchema = Joi.object({
  email: Joi.string().email().required(),
  code: Joi.string().required(),
});

export const createGenerateLoginOtpDto: ObjectSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const createLoginWithPasswordDto: ObjectSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const createLoginWithOtpDto: ObjectSchema = Joi.object({
  email: Joi.string().email().required(),
  code: Joi.string().required(),
});

export const createForgotPassword: ObjectSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const createResetPassword: ObjectSchema = Joi.object({
  email: Joi.string().email().required(),
  code: Joi.string().required(),
  newPassword: Joi.string().required(),
});

export const refreshTokenDto: ObjectSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

export const logoutDto = Joi.object({
  accessToken: Joi.string().required(),
  refreshToken: Joi.string().required(),
});

export const forgotPasswordDto = Joi.object({
  email: Joi.string().email().required(),
});

export const resetPasswordDto = Joi.object({
  email: Joi.string().email().required(),
  code: Joi.string().required(),
  newPassword: Joi.string().min(8).required(),
});
