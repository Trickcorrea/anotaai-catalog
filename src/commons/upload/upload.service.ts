import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { v4 as uuid } from 'uuid';
import { IUpload } from './upload.interface';

export class UploadService implements IUpload {
  private clientS3(command: any) {
    const client = new S3Client({
      region: process.env.AWS_DEFAULT_REGION,
    });

    return client.send(command);
  }

  async sendObject(jsonFile: Buffer) {
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${uuid()}-catalog.json`,
      Body: jsonFile,
    });

    try {
      const response = await this.clientS3(command);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  }
}

const client = new S3Client({});
