import ProductModel from '../../db/sequelize/model/product.model';
import ProductRepository from '../product.repository';
import Product from '../../../domain/entity/product';
import SequelizeHelper from '../../db/sequelize/helper/sequelize.helper';

describe('Product repository test', () => {
  beforeEach(async () => {
    await SequelizeHelper.createConnection([ProductModel]);
  });

  afterEach(async () => {
    await SequelizeHelper.closeConnection();
  });

  it('should create a product', async () => {
    // ARRANGE
    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product 1', 100);

    // ACT
    await productRepository.create(product);

    // ASSERT
    const productModel = await ProductModel.findOne({ where: { id: '1' } });
    expect(productModel.toJSON()).toStrictEqual({ id: '1', name: 'Product 1', price: 100 });
  });

  it('should update a product', async () => {
    // ARRANGE
    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product 1', 100);

    await productRepository.create(product);
    product.changeName('Updated name');

    // ACT
    await productRepository.update(product);

    // ASSERT
    const productModel = await ProductModel.findOne({ where: { id: '1' } });
    expect(productModel.toJSON()).toStrictEqual({ id: '1', name: 'Updated name', price: 100 });
  });

  it('should find a product', async () => {
    // ARRANGE
    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product 1', 100);

    await productRepository.create(product);

    // ACT
    const productFound = await productRepository.find('1');

    // ASSERT
    expect(productFound).toStrictEqual(product);
  });

  it('should find all products', async () => {
    // ARRANGE
    const productRepository = new ProductRepository();
    const product1 = new Product('1', 'Product 1', 100);
    const product2 = new Product('2', 'Product 2', 200);

    await productRepository.create(product1);
    await productRepository.create(product2);

    // ACT
    const productsFound = await productRepository.findAll();

    // ASSERT
    expect(productsFound).toStrictEqual([product1, product2]);
  });
});
