import { Auth, Storage } from 'aws-amplify';
import uuidv4 from 'uuid';
import BaseService from './BaseService';

interface S3Object {
  bucket: string;
  region: string;
  key: string;
  identityId: string;
}

class FileService extends BaseService {
  async upload(file: File): Promise<S3Object> {
    const extension = file.type.split('/').pop();
    const key = `files/${uuidv4()}.${extension}`;

    // Upload via Amplify Storage
    await Storage.put(key, file, {
      level: 'protected',
      contentType: file.type,
    });

    return {
      bucket: process.env.REACT_APP_AWS_USER_FILES_S3_BUCKET || '',
      region: process.env.REACT_APP_AWS_USER_FILES_S3_BUCKET_REGION || 'us-east-1',
      key,
      identityId: (await Auth.currentCredentials()).identityId,
    };
  }

  async get(obj: S3Object): Promise<any> {
    const { key, identityId } = obj;
    return await Storage.get(key, { level: 'protected', identityId });
  }
}

export const fileService = new FileService();
export default FileService;