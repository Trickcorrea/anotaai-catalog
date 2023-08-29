import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

export enum TypeRequest {
  body = 'body',
  query = 'query',
  params = 'params',
}

export const validateRequest =
  (schema: AnyZodObject, typeRequest: TypeRequest.body) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        ...req[TypeRequest[typeRequest]],
      });

      return next();
    } catch (error) {
      return res.status(400).json(error);
    }
  };
