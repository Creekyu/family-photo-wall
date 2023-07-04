export interface OSSConfig {
  _id: string;
  region: string;
  accessKeyId: string;
  accessKeySecret: string;
  bucket: string;
  callbackUrl?: string;
  dir?: string;
  isUsed: boolean;
}
