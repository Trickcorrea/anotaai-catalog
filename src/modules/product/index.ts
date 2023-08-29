import { Router } from 'express';
import { TypeRequest, validateRequest } from '../../commons/utils/middleware/validate-request';
import ProductService from './product.service';
import ProductController from './product.controller';
import { createProductSchema } from './schemas/create-product.schema';
import { updateProductSchema } from './schemas/update-product.schema';
import productModel from './product.model';
import CategoryModel from '../category/category.model';

const productRouter = Router();

const productService = new ProductService(productModel, CategoryModel);
const productController = new ProductController(productService);

productRouter.post(
  '/',
  validateRequest(createProductSchema, TypeRequest.body),
  productController.save,
);
productRouter.patch(
  '/:id',
  validateRequest(updateProductSchema, TypeRequest.body),
  productController.update,
);
productRouter.delete('/:id', productController.delete);
productRouter.post('/:id/category/:categoryId', productController.assignCategory);

export { productRouter };
