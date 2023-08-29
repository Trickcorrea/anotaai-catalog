import { IProduct } from '../product.model';

export interface IProductService {
  save: (product: IProduct) => Promise<IProduct>;
  update: (id: string, product: IProduct) => Promise<IProduct>;
  delete: (id: string) => Promise<IProduct>;
  assignCategory: (productId: string, categoryId: string) => Promise<IProduct>;
}
