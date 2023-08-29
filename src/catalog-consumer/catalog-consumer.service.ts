import { IUpload } from '../commons/upload/upload.interface';
import { transformJsonToFile } from '../commons/utils/transform-json-to-file.utils';
import { ICatalogService } from '../modules/catalog/interfaces/catalog-service.interface';
import { IConsumer } from './interfaces/consumer.interface';

export class CatalogConsumerService implements IConsumer {
  constructor(
    private readonly catalogService: ICatalogService,
    private readonly uploadService: IUpload,
  ) {}

  async executeReceived(owner: string) {
    const onwerParsed = owner ? JSON.parse(owner) : {};
    const catalog = await this.catalogService.findCatalogByOwner(onwerParsed.ownerId);

    if (catalog && catalog.length) {
      const catalogFile = transformJsonToFile(JSON.stringify(catalog));
      await this.uploadService.sendObject(catalogFile);
    }
  }
}
