/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ApiResponse,
  ErrorResponse,
  ErrorResponseType,
} from '@nodesandbox/response-kit';
import { TodoService } from 'apps/demo/core/business';
import { NextFunction, Request, Response } from 'express';
import { sanitize } from 'helpers';
import { CreateTodoRequestSchema } from '../dtos';

/**
 * Controller to handle the operations related to the Todo resource.
 */
export class TodoController {}
