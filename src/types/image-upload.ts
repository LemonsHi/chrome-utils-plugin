export type ProgressCB = (percent: number) => void;

export interface Row {
  uid: string;
  name: string;
  size: number;
  percent: number;
  url?: string;
  status: 'uploading' | 'done' | 'error';
}
