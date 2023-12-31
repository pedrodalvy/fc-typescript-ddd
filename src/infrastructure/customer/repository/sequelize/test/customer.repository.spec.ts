import CustomerModel from '../customer.model';
import Customer from '../../../../../domain/customer/entity/customer';
import CustomerRepository from '../customer.repository';
import Address from '../../../../../domain/customer/value-object/address';
import SequelizeHelper from '../../../../@shared/sequelize/helper/sequelize.helper';

describe('Customer repository test', () => {
  beforeEach(async () => {
    await SequelizeHelper.createConnection([CustomerModel]);
  });

  afterEach(async () => {
    await SequelizeHelper.closeConnection();
  });

  it('should create a customer', async () => {
    // ARRANGE
    const customerRepository = new CustomerRepository();
    const customer = new Customer('1', 'Customer name');
    customer.Address = new Address('Street', 123, 'Zip', 'City');

    // ACT
    await customerRepository.create(customer);

    // ASSERT
    const model = await CustomerModel.findOne({ where: { id: '1' } });
    expect(model.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      street: customer.Address.street,
      number: customer.Address.number,
      zipcode: customer.Address.zip,
      city: customer.Address.city,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
    });
  });

  it('should update a customer', async () => {
    // ARRANGE
    const customerRepository = new CustomerRepository();
    const customer = new Customer('1', 'Customer name');
    customer.Address = new Address('Street', 123, 'Zip', 'City');

    await customerRepository.create(customer);
    customer.changeName('Updated name');
    customer.activate();
    customer.addRewardPoints(10);
    customer.changeAddress(new Address('Updated Street', 456, 'Updated Zip', 'Updated City'));

    // ACT
    await customerRepository.update(customer);

    // ASSERT
    const model = await CustomerModel.findOne({ where: { id: '1' } });
    expect(model.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      street: customer.Address.street,
      number: customer.Address.number,
      zipcode: customer.Address.zip,
      city: customer.Address.city,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
    });
  });

  it('should find a customer', async () => {
    // ARRANGE
    const customerRepository = new CustomerRepository();
    const customer = new Customer('1', 'Customer name');
    customer.Address = new Address('Street', 123, 'Zip', 'City');

    await customerRepository.create(customer);

    // ACT
    const customerFound = await customerRepository.find('1');

    // ASSERT
    expect(customerFound).toStrictEqual(customer);
  });

  it('should throw an error when customer is not found', async () => {
    // ARRANGE
    const customerRepository = new CustomerRepository();

    // ASSERT
    expect(async () => customerRepository.find('1')).rejects.toThrow('Customer not found');
  });

  it('should find all customers', async () => {
    // ARRANGE
    const customerRepository = new CustomerRepository();

    const customer1 = new Customer('1', 'Customer 1');
    customer1.Address = new Address('Street 1', 1, 'Zip 1', 'City 1');

    const customer2 = new Customer('2', 'Customer 2');
    customer2.Address = new Address('Street 2', 2, 'Zip 2', 'City 2');

    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    // ACT
    const customersFound = await customerRepository.findAll();

    // ASSERT
    expect(customersFound).toStrictEqual([customer1, customer2]);
  });
});
