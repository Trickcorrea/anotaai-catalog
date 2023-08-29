import { HttpException } from '../../commons/utils/CustomError/http-exception';
import CategoryModel from '../category/category.model';
import { ICategoryModel } from '../category/interfaces/category-model.interface';
import { IProductModel } from './interfaces/product-model.interface';
import { IProductService } from './interfaces/product-service.interface';
import { IProduct } from './product.model';
import ProductService from './product.service';

describe('ProductService', () => {
  let productService: IProductService;
  let categoryModel: jest.Mocked<ICategoryModel>;
  let productModelMocked: jest.Mocked<IProductModel>;

  beforeEach(() => {
    productModelMocked = {
      findByIdAndUpdate: jest.fn(),
      findById: jest.fn(),
      deleteOne: jest.fn(),
      updateOne: jest.fn(),
      findByIdAndDelete: jest.fn(),
    } as unknown as jest.Mocked<IProductModel>;

    categoryModel = {
      findById: jest.fn(),
    } as unknown as jest.Mocked<ICategoryModel>;

    productService = new ProductService(productModelMocked, categoryModel);
  });

  describe('update', () => {
    it('should update an existing product', async () => {
      productModelMocked.findByIdAndUpdate.mockResolvedValue({
        _id: '64ed17af106fcfd31d46399d',
        title: 'title',
      });

      const productId = '64ed17af106fcfd31d46399d';
      const productPayload: IProduct = {
        title: 'title',
      } as IProduct;

      const product = await productService.update(productId, productPayload);

      expect(productModelMocked.findByIdAndUpdate).toBeCalledTimes(1);
      expect(productModelMocked.findByIdAndUpdate).toHaveBeenCalledWith(productId, productPayload);
      expect(product).toHaveProperty('_id');
      expect(product).toHaveProperty('title');
    });

    it('should throw a HttpException Custom error if product none exist', async () => {
      productModelMocked.findByIdAndUpdate.mockResolvedValue(null);

      const productId = '64ed17af106fcfd31d46399d';
      const productPayload: IProduct = {
        title: 'title',
      } as IProduct;

      const product = productService.update(productId, productPayload);

      expect(productModelMocked.findByIdAndUpdate).toBeCalledTimes(1);
      expect(productModelMocked.findByIdAndUpdate).toHaveBeenCalledWith(productId, productPayload);

      await expect(product).rejects.toBeInstanceOf(HttpException);
    });
  });

  describe('delete', () => {
    it('should delete an existing product', async () => {
      productModelMocked.findByIdAndDelete.mockResolvedValue({
        _id: '64ed17af106fcfd31d46399d',
        title: 'title',
      });

      const productId = 'mockproductId';
      const product = await productService.delete(productId);

      expect(productModelMocked.findByIdAndDelete).toHaveBeenCalledWith(productId);

      expect(product).toHaveProperty('_id');
      expect(product).toHaveProperty('title');
    });

    it('should not delete if product no exist and throw a HttpException', async () => {
      productModelMocked.findByIdAndDelete.mockResolvedValue(null);

      const productId = 'mockproductId';
      const product = productService.delete(productId);

      expect(productModelMocked.findByIdAndDelete).toHaveBeenCalledWith(productId);
      expect(productModelMocked.findByIdAndDelete).toBeCalledTimes(1);

      await expect(product).rejects.toBeInstanceOf(HttpException);
    });
  });

  describe('assignCategory', () => {
    it('should be assign category on product', async () => {
      productModelMocked.findById.mockResolvedValue({
        _id: '64ed17af106fcfd31d46399d',
        title: 'title',
      });
      categoryModel.findById.mockResolvedValue({ _id: 'id' });
      productModelMocked.updateOne.mockResolvedValue({ title: 'title' } as any);

      const productId = 'mockproductId';
      const categoryId = 'mockcategoryIdId';
      const product = await productService.assignCategory(productId, categoryId);

      expect(productModelMocked.findById).toHaveBeenCalledWith(productId);
      expect(categoryModel.findById).toHaveBeenCalledWith(categoryId);
      expect(productModelMocked.updateOne).toHaveBeenCalledWith(
        { _id: productId },
        { $set: { category: categoryId } },
      );

      expect(product).toHaveProperty('_id');
      expect(product).toHaveProperty('title');
    });
  });
});
