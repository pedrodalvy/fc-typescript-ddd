import Product from '../../entity/product';
import ProductService from '../product.service';

describe('Product service unit tests', () => {
  it('should change the price of all products', async () => {
    // ARRANGE
    const product1 = new Product('product_1', 'Product 1', 10);
    const product2 = new Product('product_2', 'Product 2', 20);
    const products = [product1, product2];

    // ACT
    ProductService.increasePrice(products, 100);

    // ASSERT
    expect(product1.price).toBe(20);
    expect(product2.price).toBe(40);
  });
});
