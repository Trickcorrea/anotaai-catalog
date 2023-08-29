import { z } from 'zod';

export const createProductSchema = z
  .object({
    title: z.string({
      required_error: 'Title is required',
    }),
    price: z.number({
      required_error: 'Price is required',
    }),
    description: z.string({
      required_error: 'Description is required',
    }),
    category: z.string({
      required_error: 'Category is required',
    }),
    owner: z.string({
      required_error: 'Owner is required',
    }),
  })
  .strict({ message: 'Only title, price, description, category and owner is allow' });
