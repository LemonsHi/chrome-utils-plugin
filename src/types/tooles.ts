import { ReactNode } from 'react';
import { NavigateFunction } from 'react-router-dom';

export interface ToolMeta {
  key: string;
  title: string;
  label: string;
  route: string;
  icon: ReactNode;
  minIcon: ReactNode;
  element?: any;
}

export interface ComponentProps {
  navigate: NavigateFunction;
}
