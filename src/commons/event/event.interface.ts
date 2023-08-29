import { IConsumer } from '../../catalog-consumer/interfaces/consumer.interface';

export interface IEvent {
  emitter: (message: Object) => void;
  receiveMessagesFromQueue: (receiver: IConsumer) => void;
}
