import { ICategoryService } from './interfaces/category-service.interface';
import CategoryService from './category.service';
import { ICatalogService } from '../catalog/interfaces/catalog-service.interface';
import { ICategoryModel } from './interfaces/category-model.interface';
import { Types } from 'mongoose';
import { ICategory } from './category.model';
import { HttpException } from '../../commons/utils/CustomError/http-exception';

describe('CategoryService', () => {
  let categoryService: ICategoryService;
  let catalogServiceMocked: jest.Mocked<ICatalogService>;
  let categoryModelMocked: jest.Mocked<ICategoryModel>;

  beforeEach(() => {
    catalogServiceMocked = {
      save: jest.fn(),
      findCatalogByOwner: jest.fn(),
      addCategory: jest.fn(),
    };

    categoryModelMocked = {
      findByIdAndUpdate: jest.fn(),
      findById: jest.fn(),
      deleteOne: jest.fn(),
    } as unknown as jest.Mocked<ICategoryModel>;

    categoryService = new CategoryService(catalogServiceMocked, categoryModelMocked);
  });

  describe('update', () => {
    it('should update an existing category', async () => {
      categoryModelMocked.findByIdAndUpdate.mockResolvedValue({
        _id: '64ed17af106fcfd31d46399d',
        title: 'title',
      });

      const categoryId = '64ed17af106fcfd31d46399d';
      const categoryPayload: ICategory = {
        title: 'title',
      } as ICategory;
      const category = await categoryService.update(categoryId, categoryPayload);

      expect(categoryModelMocked.findByIdAndUpdate).toBeCalledTimes(1);
      expect(categoryModelMocked.findByIdAndUpdate).toHaveBeenCalledWith(
        categoryId,
        categoryPayload,
      );
      expect(category).toHaveProperty('_id');
      expect(category).toHaveProperty('title');
    });

    it('should throw a HttpException Custom error if category none exist', async () => {
      categoryModelMocked.findByIdAndUpdate.mockResolvedValue(null);

      const categoryId = '64ed17af106fcfd31d46399d';
      const categoryPayload: ICategory = {
        title: 'title',
      } as ICategory;

      const category = categoryService.update(categoryId, categoryPayload);

      expect(categoryModelMocked.findByIdAndUpdate).toBeCalledTimes(1);
      expect(categoryModelMocked.findByIdAndUpdate).toHaveBeenCalledWith(
        categoryId,
        categoryPayload,
      );

      await expect(category).rejects.toBeInstanceOf(HttpException);
    });
  });

  describe('delete', () => {
    it('should delete an existing category', async () => {
      categoryModelMocked.findById.mockResolvedValue({
        _id: '64ed17af106fcfd31d46399d',
        title: 'title',
      });

      const categoryId = 'mockCategoryId';
      const category = await categoryService.delete(categoryId);

      expect(categoryModelMocked.findById).toHaveBeenCalledWith(categoryId);
      expect(categoryModelMocked.deleteOne).toHaveBeenCalledWith({ _id: categoryId });

      expect(category).toHaveProperty('_id');
      expect(category).toHaveProperty('title');
    });

    it('should not delete if category no exist and throw a HttpException', async () => {
      categoryModelMocked.findById.mockResolvedValue(null);

      const categoryId = 'mockCategoryId';
      const category = categoryService.delete(categoryId);

      expect(categoryModelMocked.findById).toHaveBeenCalledWith(categoryId);
      expect(categoryModelMocked.findById).toBeCalledTimes(1);
      expect(categoryModelMocked.deleteOne).not.toBeCalled();

      await expect(category).rejects.toBeInstanceOf(HttpException);
    });
  });
});
