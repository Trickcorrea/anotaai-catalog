import { Types } from 'mongoose';
import { CatalogBuilded, ICatalog } from '../catalog.model';

export interface ICatalogService {
  save: (ownerId: Types.ObjectId, categoryId: Types.ObjectId) => Promise<ICatalog>;
  findCatalogByOwner: (ownerId: string) => Promise<CatalogBuilded[]>;
  addCategory: (catalogId: string, categoryId: Types.ObjectId) => Promise<ICatalog>;
}
