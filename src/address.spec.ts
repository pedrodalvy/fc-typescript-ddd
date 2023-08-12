import Address from './address';

describe('Address unit tests', () => {
  it('should throw error when street is empty', () => {
    // ASSERT
    expect(() => new Address('', 1, 'zip', 'city')).toThrowError('Street is required');
  });

  it('should throw error when number is empty', () => {
    // ASSERT
    expect(() => new Address('street', 0, 'zip', 'city')).toThrowError('Number is required');
  });

  it('should throw error when zip is empty', () => {
    // ASSERT
    expect(() => new Address('street', 1, '', 'city')).toThrowError('Zip is required');
  });

  it('should throw error when city is empty', () => {
    // ASSERT
    expect(() => new Address('street', 1, 'zip', '')).toThrowError('City is required');
  });

  it('should print address', async () => {
    // ARRANGE
    const address = new Address('street', 1, 'zip', 'city');

    // ACT
    const result = address.toString();

    // ASSERT
    expect(result).toBe('street, 1, zip city');
  });
});
