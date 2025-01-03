import { httpService } from './httpService';

export interface Order {
  userId?: number;
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

export interface SimpleOrder {
  orderNumber: string;
  totalPrice: number;
  userEmail: string;
  userAddress: string;
  userPhone: string;
}

class OrderService {
  async placeOrder(order: Order) {
    const { result } = await httpService.post<Order>('/orders', {
      body: order,
    });

    return result;
  }

  async getOrders(userId: string) {
      const { result } = await httpService.get<SimpleOrder[]>(`/orders/${userId}`);
      
      return result;
  }
}

export const orderService = new OrderService();
