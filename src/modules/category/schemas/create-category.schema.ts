import { z } from 'zod';

export const createCategorySchema = z
  .object({
    title: z.string({
      required_error: 'Title is required',
    }),
    description: z.string({
      required_error: 'Description is required',
    }),
    owner: z.string({
      required_error: 'Owner is required',
    }),
  })
  .strict({ message: 'Only title, description and owner is allow' });
