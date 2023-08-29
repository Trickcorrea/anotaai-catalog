import mongoose from 'mongoose';

export async function connectDatabase() {
  const urlConnection = process.env.MONGO_DB_URL || '';
  await mongoose.connect(urlConnection);

  console.log('database connected');
}
