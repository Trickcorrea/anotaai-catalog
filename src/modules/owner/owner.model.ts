import { Schema, model, Document } from 'mongoose';

export interface IOwner extends Document {
  name: string;
}

const userSchema = new Schema<IOwner>({
  name: { type: String, required: true, unique: true, index: { unique: true } },
});

export default model<IOwner>('Owner', userSchema);
