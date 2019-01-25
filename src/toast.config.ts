export type ToastType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';

export class ToastConfig {
  text: string;
  caption?: string | undefined;
  type?: ToastType = 'light';
  lifetime?: number | undefined;
}
