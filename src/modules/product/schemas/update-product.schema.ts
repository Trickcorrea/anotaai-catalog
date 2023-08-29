import { z } from 'zod';

export const updateProductSchema = z
  .object({
    title: z.string().optional(),
    price: z.number().optional(),
    description: z.string().optional(),
    category: z.string().optional(),
    owner: z.string().optional(),
  })
  .strict({ message: 'Only title, price, description, category and owner is allow' });
