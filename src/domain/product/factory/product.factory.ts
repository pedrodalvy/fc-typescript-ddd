import ProductInterface from '../entity/product.interface';
import Product from '../entity/product';
import { randomUUID } from 'crypto';
import SimpleProduct from '../entity/simple-product';

export default class ProductFactory {
  private static mappings: { [key: string]: any } = {
    product: Product,
    simple: SimpleProduct,
  };

  static create(type: string, name: string, price: number): ProductInterface {
    const ProductClass = this.mappings[type];

    if (!ProductClass) {
      throw new Error('Product type not supported');
    }

    return new ProductClass(randomUUID(), name, price);
  }
}
