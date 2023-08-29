import 'reflect-metadata';
import dotenv from 'dotenv';
import app from './app';
import { connectDatabase } from './database';
import EventService from './commons/event/event.service';
import { catalogConsumerService } from './catalog-consumer';

dotenv.config();
const PORT = process.env.PORT || 3000;
const event = new EventService();

connectDatabase();

app.listen(PORT, async () => {
  console.log(`running on port ${PORT}`);

  setInterval(async () => {
    await event.receiveMessagesFromQueue(catalogConsumerService);
    console.log('try-receive');
  }, 20000);
});
