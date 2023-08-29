import { HttpException } from '../../commons/utils/CustomError/http-exception';
import { ICatalogService } from '../catalog/interfaces/catalog-service.interface';
import { ICategory } from './category.model';
import { ICategoryService } from './interfaces/category-service.interface';
import { ICategoryModel } from './interfaces/category-model.interface';

export default class CategoryService implements ICategoryService {
  constructor(
    private readonly catalogService: ICatalogService,
    private readonly CategoryModel: ICategoryModel,
  ) {}

  async save(categoryPayload: ICategory) {
    const category = new this.CategoryModel(categoryPayload);

    await category.save();
    await this.catalogService.save(category.owner, category._id);

    return category;
  }

  async update(id: string, categoryPayload: ICategory) {
    const categoryUpted = await this.CategoryModel.findByIdAndUpdate(id, categoryPayload);

    if (!categoryUpted) {
      throw new HttpException('category not found', 404);
    }

    return categoryUpted;
  }

  async delete(id: string) {
    const category = await this.CategoryModel.findById(id);

    if (!category) {
      throw new HttpException('category not found', 404);
    }

    await this.CategoryModel.deleteOne({ _id: id });

    return category;
  }
}
