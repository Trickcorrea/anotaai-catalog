export interface IUpload {
  sendObject: (message: Buffer) => Promise<void>;
}
