import Order from '../entity/order';
import OrderItem from '../entity/order_item';

interface OrderItemProperties {
  id: string;
  name: string;
  productId: string;
  quantity: number;
  price: number;
}

interface OrderProperties {
  id: string;
  customerId: string;
  items: OrderItemProperties[];
}

export default class OrderFactory {
  static create(properties: OrderProperties): Order {
    const items = properties.items.map(item => {
      return new OrderItem(item.id, item.name, item.price, item.productId, item.quantity);
    });

    return new Order(properties.id, properties.customerId, items);
  }
}
