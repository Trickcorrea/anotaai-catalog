import { uploadService } from '../commons/upload';
import { catalogService } from '../modules/catalog';
import { CatalogConsumerService } from './catalog-consumer.service';

const catalogConsumerService = new CatalogConsumerService(catalogService, uploadService);

export { catalogConsumerService };
