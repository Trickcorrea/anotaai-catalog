import { HttpException } from '../../commons/utils/CustomError/http-exception';
import { IProductModel } from './interfaces/product-model.interface';
import { IProductService } from './interfaces/product-service.interface';
import { IProduct } from './product.model';
import { ICategoryModel } from '../category/interfaces/category-model.interface';

export default class ProductService implements IProductService {
  constructor(
    private readonly ProductModel: IProductModel,
    private readonly CategoryModel: ICategoryModel,
  ) {}
  async save(productPayload: IProduct) {
    const product = new this.ProductModel(productPayload);

    return product.save();
  }

  async update(id: string, productPayload: IProduct) {
    const productUpted = await this.ProductModel.findByIdAndUpdate(id, productPayload);

    if (!productUpted) {
      throw new HttpException('Product not found', 404);
    }

    return productUpted;
  }

  async delete(id: string) {
    const productDeleted = await this.ProductModel.findByIdAndDelete(id);

    if (!productDeleted) {
      throw new HttpException('Product not found', 404);
    }

    return productDeleted;
  }

  async assignCategory(productId: string, categoryId: string) {
    const productPromise = this.ProductModel.findById(productId);
    const categoryPromise = this.CategoryModel.findById(categoryId);

    const [product, category] = await Promise.all([productPromise, categoryPromise]);

    if (!product) {
      throw new HttpException('Product not found', 404);
    }

    if (!category) {
      throw new HttpException('Category not found', 404);
    }

    await this.ProductModel.updateOne({ _id: productId }, { $set: { category: categoryId } });

    return product;
  }
}
