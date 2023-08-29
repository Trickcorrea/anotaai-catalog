import { Request, Response } from 'express';
import { IProductService } from './interfaces/product-service.interface';

export default class ProductController {
  constructor(private readonly productService: IProductService) {
    this.save = this.save.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.assignCategory = this.assignCategory.bind(this);
  }

  async save(req: Request, res: Response) {
    try {
      const { body } = req;
      const productCreated = await this.productService.save(body);

      res.json(productCreated);
    } catch (error: any) {
      const errorMessage = error.message || 'Error save product';
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

      const productUpdated = await this.productService.update(id, body);

      res.json(productUpdated);
    } catch (error: any) {
      const errorMessage = error.message || 'Error update product';
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
      const productDeleted = await this.productService.delete(id);

      res.json(productDeleted);
    } catch (error: any) {
      const errorMessage = error.message || 'Error delete product';
      const errorStatusCode = error.statusCode || 500;

      res
        .status(errorStatusCode)
        .json({ error: true, message: errorMessage, statusCode: errorStatusCode });
    }
  }

  async assignCategory(req: Request, res: Response) {
    try {
      const { params } = req;
      const { id, categoryId } = params;
      const productAssignedCategoryCreated = await this.productService.assignCategory(
        id,
        categoryId,
      );

      res.json(productAssignedCategoryCreated);
    } catch (error: any) {
      const errorMessage = error.message || 'Error assign to new category';
      const errorStatusCode = error.statusCode || 500;

      res
        .status(errorStatusCode)
        .json({ error: true, message: errorMessage, statusCode: errorStatusCode });
    }
  }
}
