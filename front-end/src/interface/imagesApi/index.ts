export interface addImageObj {
  filename: string;
  classification: 'memory' | 'timeline' | 'bigEvent' | 'now' | 'others';
}
