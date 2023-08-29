import { Model } from 'mongoose';
import { ICatalog } from '../catalog.model';

export interface ICatalogModel extends Model<ICatalog> {}
