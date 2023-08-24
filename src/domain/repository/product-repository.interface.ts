import RepositoryInterface from './repository.interface';
import Product from '../entity/product';

export interface ProductRepositoryInterface extends RepositoryInterface<Product> {}
