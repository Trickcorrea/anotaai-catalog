import express, { Request, Response } from 'express';
import { ownerRouter } from './modules/owner';
import { productRouter } from './modules/product';
import { categoryRouter } from './modules/category';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/owner', ownerRouter);
app.use('/product', productRouter);
app.use('/category', categoryRouter);

app.get('/', (req: Request, res: Response): void => {
  res.json({ message: `health check: ${new Date().toISOString()}` });
});

export default app;
