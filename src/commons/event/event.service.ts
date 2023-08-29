import {
  DeleteMessageCommand,
  ReceiveMessageCommand,
  SQSClient,
  SendMessageCommand,
  SendMessageCommandInput,
} from '@aws-sdk/client-sqs';
import { v4 as uuid } from 'uuid';
import { IEvent } from './event.interface';
import { IConsumer } from '../../catalog-consumer/interfaces/consumer.interface';

export default class EventService implements IEvent {
  clientSQS(command: any) {
    const client = new SQSClient({
      region: process.env.AWS_DEFAULT_REGION,
    });

    return client.send(command);
  }

  emitter(message: Object) {
    const queueUrl = process.env.AWS_SQS_URL;
    const queueName = process.env.AWS_SQS_QUEUE_NAME || 'catalog-emit.fifo';

    const sendMessageParams: SendMessageCommandInput = {
      QueueUrl: `${queueUrl}/${queueName}`,
      MessageBody: JSON.stringify(message),
      MessageGroupId: uuid(),
    };

    return this.clientSQS(new SendMessageCommand(sendMessageParams));
  }

  async receiveMessagesFromQueue(receiver: IConsumer) {
    const queueName = process.env.AWS_SQS_QUEUE_NAME;
    const queueUrl = `${process.env.AWS_SQS_URL}/${queueName}`;

    const receiveMessageParams = {
      QueueUrl: queueUrl,
      MaxNumberOfMessages: 10,
      WaitTimeSeconds: 10,
    };

    const receiveMessageCommand = new ReceiveMessageCommand(receiveMessageParams);

    try {
      const response = await this.clientSQS(receiveMessageCommand);
      const messages = (response as any)?.Messages || [];
      const indexLastMenssage = messages.length - 1;

      const lastMessage = messages[indexLastMenssage];
      const messageReceived = lastMessage?.Body;

      console.log('Mensagem recebida:', messageReceived);

      if (lastMessage) {
        const deleteMessageParams = {
          QueueUrl: queueUrl,
          ReceiptHandle: lastMessage.ReceiptHandle!,
        };

        await receiver.executeReceived(messageReceived);

        const deleteMessageCommand = new DeleteMessageCommand(deleteMessageParams);
        await this.clientSQS(deleteMessageCommand);

        console.log('Mensagem excluída após processamento.');
      }
    } catch (error) {
      console.error('Erro ao receber mensagem:', error);
    }
  }
}
