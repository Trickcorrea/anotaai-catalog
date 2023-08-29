import { Request, Response } from 'express';
import { IOwnerService } from './interfaces/owner-service.interface';

export default class OwnerController {
  constructor(private readonly ownerService: IOwnerService) {
    this.save = this.save.bind(this);
  }

  async save(req: Request, res: Response) {
    try {
      const ownerCreated = await this.ownerService.save(req.body);

      res.json(ownerCreated);
    } catch (error: any) {
      const errorMessage = error.message || 'Error create owner';
      const errorStatusCode = error.statusCode || 500;

      res
        .status(errorStatusCode)
        .json({ error: true, message: errorMessage, statusCode: errorStatusCode });
    }
  }
}
