import { IBaseModel } from '@nodesandbox/repo-framework';
import { Document } from 'mongoose';

export interface IPayment {
  orderId: string;
  amount: any;
  paymentMethod: string;
  status: string;
  transactionId: string;
}

export interface IPaymentModel extends IPayment, IBaseModel, Document {}
