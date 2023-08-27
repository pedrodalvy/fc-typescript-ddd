import OrderItem from '../../entity/order_item';
import Order from '../../entity/order';
import OrderService from '../order.service';
import Customer from '../../entity/customer';

describe('Order service unit tests', () => {
  it('should get total of all orders', () => {
    // ARRANGE
    const item1 = new OrderItem('item1', 'Item 1', 100, 'product1', 1);
    const order1 = new Order('order1', 'customerId1', [item1]);

    const item2 = new OrderItem('item2', 'Item 2', 200, 'product2', 2);
    const order2 = new Order('order2', 'customerId2', [item2]);

    // ACT
    const total = OrderService.total([order1, order2]);

    // ASSERT
    expect(total).toBe(500);
  });

  it('should throw an error when trying to place an order without items', () => {
    // ARRANGE
    const customer = new Customer('customer_id', 'Customer 1');

    // ASSERT
    expect(() => OrderService.placeOrder(customer, [])).toThrowError('Order must have at least one item');
  });

  it('should place an order', () => {
    // ARRANGE
    const customer = new Customer('customer_id', 'Customer 1');
    const item = new OrderItem('item_id', 'Item 1', 10, 'product1', 1);

    // ACT
    const order = OrderService.placeOrder(customer, [item]);

    // ASSERT
    expect(customer.rewardPoints).toBe(5);
    expect(order.total()).toBe(10);
  });
});
