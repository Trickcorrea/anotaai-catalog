import { Router } from 'express';
import { TypeRequest, validateRequest } from '../../commons/utils/middleware/validate-request';
import CategoryService from './category.service';
import CategoryController from './category.controller';
import { createCategorySchema } from './schemas/create-category.schema';
import { updateCategorySchema } from './schemas/update-category.schema';
import { catalogService } from '../catalog';
import categoryModel from './category.model';

const categoryRouter = Router();

const categorySerivice = new CategoryService(catalogService, categoryModel);
const categoryController = new CategoryController(categorySerivice);

categoryRouter.post(
  '/',
  validateRequest(createCategorySchema, TypeRequest.body),
  categoryController.save,
);
categoryRouter.patch(
  '/:id',
  validateRequest(updateCategorySchema, TypeRequest.body),
  categoryController.update,
);
categoryRouter.delete('/:id', categoryController.delete);

export { categoryRouter };
