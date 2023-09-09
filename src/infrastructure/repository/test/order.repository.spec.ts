import SequelizeHelper from '../../db/sequelize/helper/sequelize.helper';
import ProductModel from '../../db/sequelize/model/product.model';
import CustomerModel from '../../db/sequelize/model/customer.model';
import OrderModel from '../../db/sequelize/model/order.model';
import OrderItemModel from '../../db/sequelize/model/order-item.model';
import CustomerRepository from '../customer.repository';
import Customer from '../../../domain/entity/customer';
import Address from '../../../domain/entity/address';
import ProductRepository from '../product.repository';
import Product from '../../../domain/entity/product';
import OrderItem from '../../../domain/checkout/entity/order_item';
import Order from '../../../domain/checkout/entity/order';
import OrderRepository from '../order.repository';

describe('Order repository test', () => {
  let customer: Customer;
  let product: Product;

  beforeEach(async () => {
    await SequelizeHelper.createConnection([OrderModel, OrderItemModel, ProductModel, CustomerModel]);

    const customerRepository = new CustomerRepository();
    customer = new Customer('1', 'Customer 1');
    customer.Address = new Address('Street 1', 1, 'Zipcode 1', 'City 1');
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    product = new Product('1', 'Product 1', 100);
    await productRepository.create(product);
  });

  afterEach(async () => {
    await SequelizeHelper.closeConnection();
  });

  it('should create a new order', async () => {
    // ARRANGE
    const orderRepository = new OrderRepository();
    const orderItem = new OrderItem('1', product.name, product.price, product.id, 1);
    const order = new Order('1', customer.id, [orderItem]);

    // ACT
    await orderRepository.create(order);

    // ASSERT
    const model = await OrderModel.findOne({ where: { id: order.id }, include: ['items'] });
    expect(model.toJSON()).toStrictEqual({
      id: order.id,
      customerId: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          orderId: order.id,
          productId: product.id,
        },
      ],
    });
  });

  it('should update an order', async () => {
    // ARRANGE
    const orderRepository = new OrderRepository();
    const orderItem = new OrderItem('1', product.name, product.price, product.id, 1);
    const order = new Order('1', customer.id, [orderItem]);
    await orderRepository.create(order);

    const orderItem2 = new OrderItem('2', product.name, product.price, product.id, 2);
    order.replaceItems([orderItem2]);

    // ACT
    await orderRepository.update(order);

    // ASSERT
    const model = await OrderModel.findOne({ where: { id: order.id }, include: ['items'] });
    expect(model.toJSON()).toStrictEqual({
      id: order.id,
      customerId: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem2.id,
          name: orderItem2.name,
          price: orderItem2.price,
          quantity: orderItem2.quantity,
          productId: orderItem2.productId,
          orderId: order.id,
        },
      ],
    });
  });

  it('should not lost an order when fail to update', async () => {
    // ARRANGE
    const orderRepository = new OrderRepository();
    const orderItem = new OrderItem('1', product.name, product.price, product.id, 1);
    const order = new Order('1', customer.id, [orderItem]);
    await orderRepository.create(order);

    const invalidOrder = new Order('1', 'invalid_id', [orderItem]);

    // ASSERT
    await expect(orderRepository.update(invalidOrder)).rejects.toThrowError('Failed to update order');
    const model = await OrderModel.findOne({ where: { id: order.id }, include: ['items'] });
    expect(model.toJSON()).toStrictEqual({
      id: order.id,
      customerId: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          productId: orderItem.productId,
          orderId: order.id,
        },
      ],
    });
  });

  it('should find an order', async () => {
    // ARRANGE
    const orderRepository = new OrderRepository();
    const orderItem = new OrderItem('1', product.name, product.price, product.id, 1);
    const order = new Order('1', customer.id, [orderItem]);
    await orderRepository.create(order);

    // ACT
    const orderFound = await orderRepository.find(order.id);

    // ASSERT
    expect(orderFound).toStrictEqual(order);
  });

  it('should throw an error when order not found', async () => {
    // ARRANGE
    const orderRepository = new OrderRepository();

    // ASSERT
    await expect(orderRepository.find('1')).rejects.toThrowError('Order not found');
  });

  it('should find all orders', async () => {
    // ARRANGE
    const orderRepository = new OrderRepository();
    const orderItem1 = new OrderItem('1', product.name, product.price, product.id, 1);
    const order1 = new Order('1', customer.id, [orderItem1]);
    await orderRepository.create(order1);

    const orderItem2 = new OrderItem('2', product.name, product.price, product.id, 2);
    const order2 = new Order('2', customer.id, [orderItem2]);
    await orderRepository.create(order2);

    // ACT
    const ordersFound = await orderRepository.findAll();

    // ASSERT
    expect(ordersFound).toStrictEqual([order1, order2]);
  });
});
