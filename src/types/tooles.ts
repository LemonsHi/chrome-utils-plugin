import { ReactNode } from 'react';

export interface ToolMeta {
  key: string;
  title: string;
  label: string;
  route: string;
  icon: ReactNode;
  minIcon: ReactNode;
}
