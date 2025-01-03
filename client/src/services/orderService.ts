import { httpService } from './httpService';

export interface Order {
  userId?: string;
  userEmail: string;
  userAddress: string;
  userPhone: string;
  items: {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }[];
}

class OrderService {
  async placeOrder(order: Order) {
    const { result } = await httpService.post<Order>('/orders', {
      body: order,
    });

    return result;
  }
}

export const orderService = new OrderService();
