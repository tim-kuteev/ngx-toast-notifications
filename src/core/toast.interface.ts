export interface Toast {
  text: string;
  caption?: string | undefined;
  type?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | undefined;
  lifetime?: number | undefined;
}
