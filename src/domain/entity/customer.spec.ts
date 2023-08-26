import Customer from './customer';
import Address from './address';

describe('Customer unit tests', () => {
  it('should throw error when id is empty', () => {
    // ASSERT
    expect(() => new Customer('', 'any name')).toThrowError('Id is required');
  });

  it('should throw error when name is empty', () => {
    // ASSERT
    expect(() => new Customer('any_id', '')).toThrowError('Name is required');
  });

  it('should change name', () => {
    // ARRANGE
    const customer = new Customer('any_id', 'John');

    // ACT
    customer.changeName('Jane');

    // ASSERT
    expect(customer.name).toBe('Jane');
  });

  it('should throw error when name is empty when change name', async () => {
    // ARRANGE
    const customer = new Customer('any_id', 'John');

    // ASSERT
    expect(() => customer.changeName('')).toThrowError('Name is required');
  });

  it('should activate customer', async () => {
    // ARRANGE
    const customer = new Customer('any_id', 'John');
    customer.Address = new Address('street', 123, 'zip', 'city');

    // ACT
    customer.activate();

    // ASSERT
    expect(customer.isActive()).toBe(true);
  });

  it('should throw error when address is undefined when activate', async () => {
    // ARRANGE
    const customer = new Customer('any_id', 'John');

    // ASSERT
    expect(() => customer.activate()).toThrowError('Address is mandatory to activate a customer');
  });

  it('should deactivate customer', async () => {
    // ARRANGE
    const customer = new Customer('any_id', 'John');
    customer.Address = new Address('street', 123, 'zip', 'city');
    customer.activate();

    // ACT
    customer.deactivate();

    // ASSERT
    expect(customer.isActive()).toBe(false);
  });

  it('should add reward points', () => {
    // ARRANGE
    const customer = new Customer('any_id', 'John');

    // ACT
    customer.addRewardPoints(10);

    // ASSERT
    expect(customer.rewardPoints).toBe(10);
  });

  it('should increase reward points multiple times', () => {
    // ARRANGE
    const customer = new Customer('any_id', 'John');

    // ACT
    customer.addRewardPoints(10);
    customer.addRewardPoints(20);
    customer.addRewardPoints(30);

    // ASSERT
    expect(customer.rewardPoints).toBe(60);
  });

  it('should change address', async () => {
    // ARRANGE
    const customer = new Customer('any_id', 'John');
    customer.Address = new Address('street', 123, 'zip', 'city');

    // ACT
    customer.changeAddress(new Address('street2', 456, 'zip2', 'city2'));

    // ASSERT
    expect(customer.Address.street).toBe('street2');
    expect(customer.Address.number).toBe(456);
    expect(customer.Address.zip).toBe('zip2');
    expect(customer.Address.city).toBe('city2');
  });
});
