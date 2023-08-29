import CatalogService from './catalog.service';
import CatalogModel from './catalog.model';

const catalogService = new CatalogService(CatalogModel);

export { catalogService };
