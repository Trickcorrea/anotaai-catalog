import { Schema, model, Document, Types } from 'mongoose';
import OwnerModel from '../owner/owner.model';
import ProductModel from '../product/product.model';

export interface ICategory extends Document {
  title: string;
  description: string;
  owner: Types.ObjectId;
}

const categorySchema = new Schema<ICategory>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: OwnerModel, required: true },
});

categorySchema.post('deleteOne', async function (category, next) {
  await ProductModel.updateMany(
    {
      category: category._id,
    },
    {
      $set: {
        category: null,
      },
    },
  );

  next();
});

export default model<ICategory>('Category', categorySchema);
