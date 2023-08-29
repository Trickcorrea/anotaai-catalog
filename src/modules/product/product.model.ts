import { Schema, model, Document, Types } from 'mongoose';
import EventService from '../../commons/event/event.service';

const eventService = new EventService();

export interface IProduct extends Document {
  title: string;
  category: Types.ObjectId;
  price: number;
  description: string;
  owner: Types.ObjectId;
}

export const productSchema = new Schema<IProduct>({
  title: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: false },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'Owner', required: true },
});

productSchema.post('save', function (doc, next) {
  eventService.emitter({ ownerId: doc.owner });
  next();
});

productSchema.post('findOneAndUpdate', function (doc, next) {
  eventService.emitter({ ownerId: doc.owner });
  next();
});

productSchema.post('updateOne', function (doc, next) {
  eventService.emitter({ ownerId: doc.owner });
  next();
});

export default model<IProduct>('Product', productSchema);
