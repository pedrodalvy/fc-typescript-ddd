import SimpleProduct from '../simple-product';

describe('Simple Product unit test', () => {
  it('should create a product', async () => {
    // ACT
    const product = new SimpleProduct('1', 'Simple Product', 10);

    // ASSERT
    expect(product.id).toBe('1');
    expect(product.name).toBe('Simple Product');
    expect(product.price).toBe(20);
  });
  it('should change name', async () => {
    // ARRANGE
    const product = new SimpleProduct('1', 'Simple Product', 10);

    // ACT
    product.changeName('Simple Product 2');

    // ASSERT
    expect(product.name).toBe('Simple Product 2');
  });

  it('should change price', () => {
    // ARRANGE
    const product = new SimpleProduct('1', 'Simple Product', 10);

    // ACT
    product.changePrice(20);

    // ASSERT
    expect(product.price).toBe(40);
  });
});
