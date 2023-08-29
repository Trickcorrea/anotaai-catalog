import { ICategory } from '../category.model';

export interface ICategoryService {
  save: (category: ICategory) => Promise<ICategory>;
  update: (id: string, category: ICategory) => Promise<ICategory>;
  delete: (id: string) => Promise<ICategory>;
}
