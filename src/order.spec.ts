import Order from './order';
import OrderItem from './order_item';

describe('Order unit tests', () => {
  it('should throw error when id is empty', () => {
    // ASSERT
    expect(() => new Order('', 'any_id', [])).toThrowError('Id is required');
  });

  it('should throw error when customerId is empty', () => {
    // ASSERT
    expect(() => new Order('any_id', '', [])).toThrowError('CustomerId is required');
  });

  it('should throw error when items is empty', () => {
    // ASSERT
    expect(() => new Order('any_id', 'any_customerId', [])).toThrowError('Items are required');
  });

  it('should throw error when a quantity is empty', () => {
    // ARRANGE
    const item = new OrderItem('i1', 'item1', 100, 'p1', 0);

    // ASSERT
    expect(() => new Order('o1', 'c1', [item])).toThrowError('Quantity must be greater than 0');
  });

  it('should create an order', async () => {
    // ARRANGE
    const itemOne = new OrderItem('i1', 'item1', 100, 'p1', 2);
    const itemTwo = new OrderItem('i2', 'item2', 50, 'p2', 3);

    // ACT
    const order = new Order('o1', 'c1', [itemOne, itemTwo]);

    // ASSERT
    expect(order.id).toBe('o1');
  });

  it('should calculate total', async () => {
    // ARRANGE
    const itemOne = new OrderItem('i1', 'item1', 100, 'p1', 2);
    const itemTwo = new OrderItem('i2', 'item2', 50, 'p2', 3);

    // ACT
    const order = new Order('o1', 'c1', [itemOne, itemTwo]);

    // ASSERT
    expect(order.total()).toBe(350);
  });
});
