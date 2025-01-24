/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiResponse } from '@nodesandbox/response-kit';
import { NextFunction, Request, Response } from 'express';
import { sanitize } from 'helpers';
import { OrdersService } from '../../business';
import ordersService from '../../business/services/orders.service';
import { createOrdersRequestDto, updateOrdersRequestDto } from '../dtos';

export class OrdersController {
  static async createOrders(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('==USERID===', req.user);
      const userId = req.params.userId;
      const _payload = sanitize(req.body, createOrdersRequestDto);
      if (!_payload.success) {
        throw _payload.error;
      }

      _payload.data.user = userId;

      const response = await OrdersService.create(_payload.data);

      if (!response.success) {
        throw response.error;
      }

      ApiResponse.success(res, response.data, 201);
    } catch (error) {
      ApiResponse.error(res, {
        success: false,
        error: error as any,
      });
    }
  }

  static async getOrdersByUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = req.params.userId;
      const filters = { ...req.query, user: userId };
      const response = await OrdersService.getOrders(filters);
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

  static async getOrdersByUserByOrdersId(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = req.params.userId;
      const orderId = req.params.orderId;
      const filters = { ...req.query, user: userId, order: orderId };

      const response = await ordersService.getOrders(filters);

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

  static async getAllOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const filters = req.query;
      const response = await OrdersService.getAllOrders(filters);
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

  static async updateOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const orderId = req.params.orderId;
      const userId = req.params.userId;

      const _payload = sanitize(req.body, updateOrdersRequestDto);

      if (!_payload.success) {
        throw _payload.error;
      }

      const verifyOrder = await ordersService.verifyOrderOwnership(
        orderId,
        userId,
      );

      if (!verifyOrder.success) {
        throw verifyOrder.error;
      }

      const response = await ordersService.updateById(orderId, _payload.data);

      if (!response.success) {
        throw response.error;
      }

      ApiResponse.success(
        res,
        { ...response, message: 'the orders has been successfully modified' },
        202,
      );
    } catch (error) {
      ApiResponse.error(res, {
        success: false,
        error: error as any,
      });
    }
  }

  static async deleteOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const orderId = req.params.orderId;
      const userId = req.params.userId;

      const verifyOrder = await ordersService.verifyOrderOwnership(
        orderId,
        userId,
      );

      if (!verifyOrder.success) {
        throw verifyOrder.error;
      }

      const response = await ordersService.deleteById(orderId);

      if (!response.success) {
        throw response.error;
      }

      ApiResponse.success(
        res,
        { ...response, message: 'the order has been successfully removed' },
        202,
      );
    } catch (error) {
      ApiResponse.error(res, {
        success: false,
        error: error as any,
      });
    }
  }
}
