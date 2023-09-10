import ProductFactory from '../product.factory';
import * as crypto from 'crypto';

describe('Product Factory unit test', () => {
  it('should create a product', async () => {
    // ARRANGE
    const id = crypto.randomUUID();
    jest.spyOn(crypto, 'randomUUID').mockReturnValue(id);

    // ACT
    const product = ProductFactory.create('product', 'Product A', 1);

    // ASSERT
    expect(product.id).toBe(id);
    expect(product.name).toBe('Product A');
    expect(product.price).toBe(1);
    expect(product.constructor.name).toBe('Product');
  });

  it('should create a simple product', async () => {
    // ARRANGE
    const id = crypto.randomUUID();
    jest.spyOn(crypto, 'randomUUID').mockReturnValue(id);

    // ACT
    const product = ProductFactory.create('simple', 'Product B', 2);

    // ASSERT
    expect(product.id).toBe(id);
    expect(product.name).toBe('Product B');
    expect(product.price).toBe(4);
    expect(product.constructor.name).toBe('SimpleProduct');
  });

  it('should throw an error when product type is not supported', async () => {
    // ASSERT
    expect(() => ProductFactory.create('invalid', 'Product C', 3)).toThrowError('Product type not supported');
  });
});
