import OrderItem from '../entity/order_item';
import Order from '../entity/order';
import OrderService from './order.service';

describe('Order service unit tests', () => {
  it('should get total of all orders', () => {
    // ARRANGE
    const intem1 = new OrderItem('item1', 'Item 1', 100, 'product1', 1);
    const order1 = new Order('order1', 'customerId1', [intem1]);

    const intem2 = new OrderItem('item2', 'Item 2', 200, 'product2', 2);
    const order2 = new Order('order2', 'customerId2', [intem2]);

    // ACT
    const total = OrderService.total([order1, order2]);

    // ASSERT
    expect(total).toBe(500);
  });
});
