import { OrderRepositoryInterface } from '../../../../domain/checkout/repository/order-repository.interface';
import Order from '../../../../domain/checkout/entity/order';
import OrderItem from '../../../../domain/checkout/entity/order_item';
import OrderModel from './order.model';

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
    const orderBackup = await this.find(entity.id);

    try {
      await OrderModel.destroy({ where: { id: entity.id }, cascade: true });
      await this.create(entity);
    } catch (_) {
      await this.create(orderBackup);
      throw new Error('Failed to update order');
    }
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
