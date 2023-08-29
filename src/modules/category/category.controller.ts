import { Request, Response } from 'express';
import { ICategoryService } from './interfaces/category-service.interface';

export default class CategoryController {
  constructor(private readonly categoryService: ICategoryService) {
    this.save = this.save.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async save(req: Request, res: Response) {
    try {
      const { body } = req;
      const categoryCreated = await this.categoryService.save(body);

      res.json(categoryCreated);
    } catch (error: any) {
      const errorMessage = error.message || 'Error save category';
      const errorStatusCode = error.statusCode || 500;

      res
        .status(errorStatusCode)
        .json({ error: true, message: errorMessage, statusCode: errorStatusCode });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { body, params } = req;
      const { id } = params;

      const categoryUpdated = await this.categoryService.update(id, body);

      res.json(categoryUpdated);
    } catch (error: any) {
      const errorMessage = error.message || 'Error update category';
      const errorStatusCode = error.statusCode || 500;

      res
        .status(errorStatusCode)
        .json({ error: true, message: errorMessage, statusCode: errorStatusCode });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { params } = req;
      const { id } = params;
      const categoryDeleted = await this.categoryService.delete(id);

      res.json(categoryDeleted);
    } catch (error: any) {
      const errorMessage = error.message || 'Error delete category';
      const errorStatusCode = error.statusCode || 500;

      res
        .status(errorStatusCode)
        .json({ error: true, message: errorMessage, statusCode: errorStatusCode });
    }
  }
}
