import { OrderRepositoryInterface } from '../../domain/repository/order-repository.interface';
import Order from '../../domain/entity/order';
import OrderItem from '../../domain/entity/order_item';
import OrderModel from '../db/sequelize/model/order.model';

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customerId: entity.customerId,
        total: entity.total(),
        items: entity.items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          orderId: entity.id,
          productId: item.productId,
        })),
      },
      {
        include: ['items'],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    await OrderModel.destroy({ where: { id: entity.id }, cascade: true });
    await this.create(entity);
  }

  async find(id: string): Promise<Order> {
    try {
      const { id: orderId, customerId, items } = await OrderModel.findOne({ where: { id }, include: ['items'] });
      const orderItems = items.map(
        item => new OrderItem(item.id, item.name, item.price, item.productId, item.quantity)
      );
      return new Order(orderId, customerId, orderItems);
    } catch (_) {
      throw new Error('Order not found');
    }
  }

  async findAll(): Promise<Order[]> {
    const models = await OrderModel.findAll({ include: ['items'] });
    return models.map(
      model =>
        new Order(
          model.id,
          model.customerId,
          model.items.map(item => new OrderItem(item.id, item.name, item.price, item.productId, item.quantity))
        )
    );
  }
}
