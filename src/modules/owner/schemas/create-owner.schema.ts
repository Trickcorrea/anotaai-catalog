import { z } from 'zod';

export const createOwnerSchema = z
  .object({
    name: z.string({
      required_error: 'Name is required',
    }),
  })
  .strict({ message: 'only name is allow' });
