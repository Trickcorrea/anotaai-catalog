import { IOwner } from '../owner.model';

export interface IOwnerService {
  save: (owner: IOwner) => Promise<IOwner>;
}
