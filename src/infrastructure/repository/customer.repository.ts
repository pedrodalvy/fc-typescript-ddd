import { CustomerRepositoryInterface } from '../../domain/repository/customer-repository.interface.ts';
import Customer from '../../domain/entity/customer';
import CustomerModel from '../db/sequelize/model/customer.model';
import Address from '../../domain/entity/address';

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
    const model = await CustomerModel.findOne({ where: { id } });

    const customer = new Customer(model.id, model.name);
    customer.Address = new Address(model.street, model.number, model.zipcode, model.city);

    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const models = await CustomerModel.findAll();

    return models.map(model => {
      const customer = new Customer(model.id, model.name);
      customer.Address = new Address(model.street, model.number, model.zipcode, model.city);

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
