import { model } from 'mongoose';
import { IProduct } from '../product.model';
import { Model } from 'mongoose';

export interface IProductModel extends Model<IProduct> {}
