import OrderFactory from '../order.factory';

describe('Order Factory unit test', () => {
  it('should create an order with items', async () => {
    // ARRANGE
    const items = [
      { id: '1', name: 'Item 1', productId: '1', quantity: 1, price: 10 },
      { id: '2', name: 'Item 2', productId: '2', quantity: 2, price: 20 },
    ];

    // ACT
    const order = OrderFactory.create({ id: '1', customerId: '1', items });

    // ASSERT
    expect(order.id).toEqual('1');
    expect(order.customerId).toEqual('1');
    expect(order.items.length).toEqual(items.length);

    expect(order.items[0].id).toEqual(items[0].id);
    expect(order.items[0].name).toEqual(items[0].name);
    expect(order.items[0].productId).toEqual(items[0].productId);
    expect(order.items[0].quantity).toEqual(items[0].quantity);
    expect(order.items[0].price).toEqual(items[0].price);

    expect(order.items[1].id).toEqual(items[1].id);
    expect(order.items[1].name).toEqual(items[1].name);
    expect(order.items[1].productId).toEqual(items[1].productId);
    expect(order.items[1].quantity).toEqual(items[1].quantity);
    expect(order.items[1].price).toEqual(items[1].price);
  });
});
