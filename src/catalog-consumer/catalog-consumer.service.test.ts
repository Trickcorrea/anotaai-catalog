import { IConsumer } from './interfaces/consumer.interface';
import { CatalogConsumerService } from './catalog-consumer.service';
import { ICatalogService } from '../modules/catalog/interfaces/catalog-service.interface';
import { IUpload } from '../commons/upload/upload.interface';
import { CatalogBuilded } from '../modules/catalog/catalog.model';

describe('CatalogConsumerService', () => {
  let catalogConsumerService: IConsumer;
  let mockCatalogService: jest.Mocked<ICatalogService>;
  let mockUploadService: jest.Mocked<IUpload>;

  beforeEach(() => {
    mockCatalogService = {
      findCatalogByOwner: jest.fn(),
      save: jest.fn(),
      addCategory: jest.fn(),
    };
    mockUploadService = {
      sendObject: jest.fn(),
    };

    catalogConsumerService = new CatalogConsumerService(mockCatalogService, mockUploadService);
  });

  it('should process and upload catalog', async () => {
    const ownerId = 'OwnerId';
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

    mockCatalogService.findCatalogByOwner.mockResolvedValue(mockCatalog as CatalogBuilded[]);
    mockUploadService.sendObject.mockResolvedValue();

    await catalogConsumerService.executeReceived(JSON.stringify({ ownerId }));

    expect(mockCatalogService.findCatalogByOwner).toBeCalledTimes(1);
    expect(mockUploadService.sendObject).toBeCalledTimes(1);
  });

  it('should not upload if catalog is empty', async () => {
    const ownerId = 'OwnerId';

    mockCatalogService.findCatalogByOwner.mockResolvedValue([]);

    await catalogConsumerService.executeReceived(JSON.stringify({ ownerId }));

    expect(mockCatalogService.findCatalogByOwner).toHaveBeenCalledWith(ownerId);
    expect(mockCatalogService.findCatalogByOwner).toHaveBeenCalledTimes(1);
    expect(mockUploadService.sendObject).not.toHaveBeenCalled();
  });
});
