import { z } from 'zod';

export const updateCategorySchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    owner: z.string().optional(),
  })
  .strict({ message: 'Only title, description and owner is allow' });
