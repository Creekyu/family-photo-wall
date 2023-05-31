export type cls = 'memory' | 'bigEvent' | 'now' | 'others';
export type clsValue = '往事回忆' | '大事记' | '即时上传' | '其他';

export enum ClsEnum {
  'memory' = '往事回忆',
  'bigEvent' = '大事记',
  'now' = '即时上传',
  'others' = '其他',
}

export enum ColorEnum {
  '往事回忆' = 'magenta',
  '大事记' = 'geekblue',
  '即时上传' = 'purple',
  '其他' = 'green',
}

export interface AddImageObj {
  filename: string;
  classification: cls;
  photoTime: Date;
}

export interface updateImage {
  fileList: string[];
  classification: cls;
}

export interface ImgObj {
  _id: string;
  url: string;
  filename: string;
  classification: cls;
  uploadAt: Date;
  photoTime: Date;
}
