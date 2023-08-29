import { Schema, model, Document, Types } from 'mongoose';

export type CatalogBuilded = {
  _id: string;
  owner: {
    _id: string;
    name: string;
  };
  categories: {
    _id: string;
    title: string;
    description: string;
    itens: {
      _id: string;
      title: string;
    };
  };
};

export interface ICatalog extends Document {
  owner: Types.ObjectId;
  category: Types.ObjectId[];
}

const catalogSchema = new Schema<ICatalog>({
  owner: { type: Schema.Types.ObjectId, ref: 'Owner', unique: true, required: true },
  category: [{ type: Schema.Types.ObjectId, ref: 'Category', required: false }],
});

export default model<ICatalog>('Catalog', catalogSchema);
