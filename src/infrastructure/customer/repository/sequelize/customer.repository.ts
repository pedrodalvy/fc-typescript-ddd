import { CustomerRepositoryInterface } from '../../../../domain/customer/repository/customer-repository.interface.ts';
import Customer from '../../../../domain/customer/entity/customer';
import CustomerModel from './customer.model';
import Address from '../../../../domain/customer/value-object/address';

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.Address.street,
      number: entity.Address.number,
      zipcode: entity.Address.zip,
      city: entity.Address.city,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints,
    });
  }

  async find(id: string): Promise<Customer> {
    try {
      const model = await CustomerModel.findOne({ where: { id }, rejectOnEmpty: true });

      const customer = new Customer(model.id, model.name);
      customer.Address = new Address(model.street, model.number, model.zipcode, model.city);
      customer.addRewardPoints(model.rewardPoints);

      return customer;
    } catch (_) {
      throw new Error('Customer not found');
    }
  }

  async findAll(): Promise<Customer[]> {
    const models = await CustomerModel.findAll();

    return models.map(model => {
      const customer = new Customer(model.id, model.name);
      customer.Address = new Address(model.street, model.number, model.zipcode, model.city);
      customer.addRewardPoints(model.rewardPoints);

      return customer;
    });
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        street: entity.Address.street,
        number: entity.Address.number,
        zipcode: entity.Address.zip,
        city: entity.Address.city,
        active: entity.isActive(),
        rewardPoints: entity.rewardPoints,
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }
}
