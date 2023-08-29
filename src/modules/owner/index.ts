import { Router } from 'express';
import { TypeRequest, validateRequest } from '../../commons/utils/middleware/validate-request';
import { createOwnerSchema } from './schemas/create-owner.schema';
import OwnerService from './owner.service';
import OwnerController from './owner.controller';

const ownerRouter = Router();

const ownerService = new OwnerService();
const ownerController = new OwnerController(ownerService);

ownerRouter.post('/', validateRequest(createOwnerSchema, TypeRequest.body), ownerController.save);

export { ownerRouter };
