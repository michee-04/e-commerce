/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiResponse } from '@nodesandbox/response-kit';
import { NextFunction, Request, Response } from 'express';
import { sanitize } from 'helpers';
import { OrderItemsService } from '../../business';
import { createOrdersItemsRequestDto } from '../dtos';

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

      _payload.data.order = order;
      _payload.data.product = product;

      const response = await OrderItemsService.create(_payload.data);

      if (!response.success) {
        throw response.error;
      }
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

  static async getOrdersItemsId(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    //
  }
}
