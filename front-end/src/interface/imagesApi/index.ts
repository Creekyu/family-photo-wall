export type cls = 'memory' | 'timeline' | 'bigEvent' | 'now' | 'others';

export interface addImageObj {
  filename: string;
  classification: cls;
}

export interface imgObj {
  _id: string;
  url: string;
  filename: string;
  classification: cls;
}
