export interface IConsumer {
  executeReceived: (ownerId: string) => Promise<void>;
}
