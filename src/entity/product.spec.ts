import Product from './product';

describe('Product unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => new Product('', 'Product 1', 10)).toThrowError('Id is required');
  });

  it('should throw error when name is empty', () => {
    expect(() => new Product('1', '', 10)).toThrowError('Name is required');
  });

  it('should throw error when price is equal to zero', () => {
    expect(() => new Product('1', 'Product 1', 0)).toThrowError('Price must be greater than zero');
  });

  it('should change name', () => {
    // ARRANGE
    const product = new Product('1', 'Product 1', 10);

    // ACT
    product.changeName('Product 2');

    // ASSERT
    expect(product.name).toBe('Product 2');
  });

  it('should throw error when name is empty when change name', async () => {
    // ARRANGE
    const product = new Product('1', 'Product 1', 10);

    // ASSERT
    expect(() => product.changeName('')).toThrowError('Name is required');
  });

  it('should change price', () => {
    // ARRANGE
    const product = new Product('1', 'Product 1', 10);

    // ACT
    product.changePrice(20);

    // ASSERT
    expect(product.price).toBe(20);
  });

  it('should throw error when price is equal to zero when change price', async () => {
    // ARRANGE
    const product = new Product('1', 'Product 1', 10);

    // ASSERT
    expect(() => product.changePrice(0)).toThrowError('Price must be greater than zero');
  });
});
