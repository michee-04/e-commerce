/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiResponse } from '@nodesandbox/response-kit';
import { NextFunction, Request, Response } from 'express';
import { sanitize } from 'helpers';
import { OrderItemsService } from '../../business';
import {
  createOrdersItemsRequestDto,
  updateOrdersItemsRequestDto,
} from '../dtos';

export class OrderItemController {
  static async createOrderItem(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const order = req.params.orderId;
      const product = req.params.productId;
      const _payload = sanitize(req.body, createOrdersItemsRequestDto);

      if (!_payload.success) {
        throw _payload.error;
      }

      _payload.data = {
        ..._payload.data,
        order,
        product,
      };

      const response = await OrderItemsService.create(_payload.data);

      if (!response.success) {
        throw response.error;
      }
      ApiResponse.success(res, response, 201);
    } catch (error) {
      ApiResponse.error(res, {
        success: false,
        error: error as any,
      });
    }
  }

  static async getUsersAllOrders(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const order = req.params.orderId;
      const product = req.params.productId;
      const filters = { ...req.query, order: order, product: product };
      const response = await OrderItemsService.getOrders(filters);

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

  // TODO: tester pour resoudre l'erreur
  static async getOrdersItemsId(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const orderItemId = req.params.orderItemId;
      const order = req.params.orderId;
      const filters = { ...req.query, order: order, _id: orderItemId };

      const response = await OrderItemsService.getOrders(filters);

      if (!response.success) {
        throw response.error;
      }

      ApiResponse.success(res, response);
    } catch (error) {
      console.log('🐧🐧🐧🐧 : ', error);
      ApiResponse.error(res, {
        success: false,
        error: error as any,
      });
    }
  }

  static async getAllOrderItems(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const filters = req.query;
      const response = await OrderItemsService.findAll();

      if (!response.success) {
        throw response.error;
      }

      ApiResponse.success(res, response);
    } catch (error) {
      console.log('🐧🐧🐧🐧 : ', error);
      ApiResponse.error(res, {
        success: false,
        error: error as any,
      });
    }
  }

  static async updateOrderItem(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const orderItemId = req.params.orderItemId;
      const _payload = sanitize(req.body, updateOrdersItemsRequestDto);

      if (!_payload.success) {
        throw _payload.error;
      }

      const response = await OrderItemsService.updateById(
        orderItemId,
        _payload.data,
      );

      if (!response.success) {
        throw response.error;
      }

      ApiResponse.success(
        res,
        {
          ...response,
          message: 'the order item has been successfully modified',
        },
        202,
      );
    } catch (error) {
      ApiResponse.error(res, {
        success: false,
        error: error as any,
      });
    }
  }

  static async deleteOrderItem(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const id = req.params.orderItemId;

      const response = await OrderItemsService.deleteById(id);

      if (!response.success) {
        throw response.error;
      }

      ApiResponse.success(
        res,
        {
          ...response,
          message: 'the order item has been successfully removed',
        },
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
