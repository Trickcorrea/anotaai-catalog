import { Model } from 'mongoose';
import { ICategory } from '../category.model';

export interface ICategoryModel extends Model<ICategory> {}
