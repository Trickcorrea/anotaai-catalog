import { Types } from 'mongoose';
import { ICatalogModel } from './interfaces/catalog-model.interface';
import { ICatalogService } from './interfaces/catalog-service.interface';
import CatalogService from './catalog.service';
import { CatalogBuilded } from './catalog.model';
import { HttpException } from '../../commons/utils/CustomError/http-exception';

describe('CatalogService', () => {
  let catalogService: ICatalogService;
  let mockCatalogModel: jest.Mocked<ICatalogModel>;

  beforeEach(() => {
    mockCatalogModel = {
      aggregate: jest.fn(),
      findOne: jest.fn(),
      findOneAndUpdate: jest.fn(),
      save: jest.fn(),
    } as unknown as jest.Mocked<ICatalogModel>;

    catalogService = new CatalogService(mockCatalogModel as ICatalogModel);
  });

  describe('findCatalogByOwner', () => {
    it('should return catalog with categories and items for a given owner', async () => {
      const mockCatalog: Partial<CatalogBuilded[]> = [
        {
          _id: 'idCatalog',
          owner: {
            _id: 'idOwner',
            name: 'name owner',
          },
          categories: {
            _id: 'id categories',
            title: 'title category',
            description: 'description category',
            itens: {
              _id: 'id itens',
              title: 'title item',
            },
          },
        },
      ];

      mockCatalogModel.aggregate.mockResolvedValue(mockCatalog);

      const owner = '64ed17af106fcfd31d46399d';
      const catalogs = await catalogService.findCatalogByOwner(owner);

      expect(mockCatalogModel.aggregate).toHaveBeenCalled();
      expect(mockCatalogModel.aggregate).toHaveBeenCalledTimes(1);

      catalogs.forEach((catalog) => {
        expect(catalog).toHaveProperty('_id');
        expect(catalog).toHaveProperty('owner');
        expect(catalog).toHaveProperty('categories');
      });
    });
  });

  describe('save', () => {
    it('should add a category in catalog if exists', async () => {
      const id = '64ed17af106fcfd31d46399d';
      mockCatalogModel.findOne.mockResolvedValue({ _id: id });

      catalogService.addCategory = jest.fn();

      const ownerId = new Types.ObjectId();
      const categoryId = new Types.ObjectId();
      const result = await catalogService.save(ownerId, categoryId);

      expect(mockCatalogModel.findOne).toHaveBeenCalledWith({ owner: ownerId });
      expect((mockCatalogModel as any).save).not.toHaveBeenCalled();
    });
  });

  describe('addCategory', () => {
    it('should add a category to an existing catalog', async () => {
      mockCatalogModel.findOneAndUpdate.mockResolvedValue({ _id: '64ed17af106fcfd31d46399d' });

      const catalogId = '64ed17af106fcfd31d46399d';
      const categoryId = new Types.ObjectId();
      const result = await catalogService.addCategory(catalogId, categoryId);

      expect(result).toHaveProperty('_id');
      expect(mockCatalogModel.findOneAndUpdate).toBeCalledTimes(1);
      expect(mockCatalogModel.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: catalogId },
        { $push: { category: categoryId } },
      );
    });

    it('should throw a HttpException Custom error', async () => {
      mockCatalogModel.findOneAndUpdate.mockResolvedValue(null);

      const catalogId = '64ed17af106fcfd31d46399d';
      const categoryId = new Types.ObjectId();

      const catalog = catalogService.addCategory(catalogId, categoryId);

      await expect(catalog).rejects.toBeInstanceOf(HttpException);
    });
  });
});
