import { Types } from 'mongoose';
import { HttpException } from '../../commons/utils/CustomError/http-exception';
import { ICatalogModel } from './interfaces/catalog-model.interface';
import { ICatalogService } from './interfaces/catalog-service.interface';

export default class CatalogService implements ICatalogService {
  constructor(private readonly CatalogModel: ICatalogModel) {
    this.save = this.save.bind(this);
  }

  async findCatalogByOwner(owner: string) {
    return this.CatalogModel.aggregate([
      {
        $match: {
          owner: new Types.ObjectId(owner),
        },
      },
      {
        $lookup: {
          from: 'owners',
          localField: 'owner',
          foreignField: '_id',
          as: 'owners',
        },
      },
      {
        $unwind: '$category',
      },
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'categories',
        },
      },
      {
        $unwind: '$categories',
      },
      {
        $lookup: {
          from: 'products',
          localField: 'categories._id',
          foreignField: 'category',
          as: 'categories.itens',
        },
      },
      {
        $group: {
          _id: '$_id',
          owner: { $first: { $arrayElemAt: ['$owners', 0] } },
          categories: { $push: '$categories' },
        },
      },
      {
        $project: {
          _id: 1,
          owner: {
            _id: 1,
            name: 1,
          },
          categories: {
            _id: 1,
            title: 1,
            description: 1,
            itens: {
              _id: 1,
              title: 1,
              price: 1,
              description: 1,
            },
          },
        },
      },
    ]);
  }

  async save(ownerId: Types.ObjectId, categoryId: Types.ObjectId) {
    const catalog = await this.CatalogModel.findOne({ owner: ownerId });

    if (!catalog) {
      const catalogCreated = new this.CatalogModel({ owner: ownerId, category: [categoryId] });
      return catalogCreated.save();
    }

    return this.addCategory(catalog._id, categoryId);
  }

  async addCategory(catalogId: string, categoryId: Types.ObjectId) {
    const catalog = (await this.CatalogModel.findOneAndUpdate(
      { _id: catalogId },
      { $push: { category: categoryId } },
    )) as any;

    if (!catalog) {
      throw new HttpException('Catalog not found', 404);
    }

    return catalog;
  }
}
