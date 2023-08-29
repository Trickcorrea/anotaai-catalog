import OwnerModel, { IOwner } from './owner.model';
import { IOwnerService } from './interfaces/owner-service.interface';
import { HttpException } from '../../commons/utils/CustomError/http-exception';

export default class OwnerService implements IOwnerService {
  async save(ownerPayload: IOwner) {
    const owner = await OwnerModel.findOne({ name: ownerPayload.name });

    if (owner) {
      throw new HttpException('Owner is unique', 400);
    }

    const ownerCreated = new OwnerModel(ownerPayload);

    return ownerCreated.save();
  }
}
