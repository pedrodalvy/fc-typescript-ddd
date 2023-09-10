import CustomerFactory from '../customer.factory';
import * as crypto from 'crypto';
import Address from '../../value-object/address';

describe('Customer Factory unit test', () => {
  it('should create a customer', async () => {
    // ARRANGE
    const id = crypto.randomUUID();
    jest.spyOn(crypto, 'randomUUID').mockReturnValue(id);

    // ACT
    const customer = CustomerFactory.create('John Doe');

    // ASSERT
    expect(customer.id).toBe(id);
    expect(customer.name).toBe('John Doe');
  });

  it('should create a customer with address', async () => {
    // ARRANGE
    const id = crypto.randomUUID();
    jest.spyOn(crypto, 'randomUUID').mockReturnValue(id);

    // ACT
    const customer = CustomerFactory.createWithAddress('John Doe', new Address('Street A', 1, '12345-678', 'City A'));

    // ASSERT
    expect(customer.id).toBe(id);
    expect(customer.name).toBe('John Doe');
    expect(customer.Address.street).toBe('Street A');
    expect(customer.Address.number).toBe(1);
    expect(customer.Address.zip).toBe('12345-678');
    expect(customer.Address.city).toBe('City A');
  });
});
