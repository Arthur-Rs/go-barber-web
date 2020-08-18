export interface toastContextData {
  addToast(message: Omit<toastProps, 'id'>): void
  removeToast(id: string): void
  toasts: toastProps[]
}

export interface toastProps {
  id: string
  title: string
  type?: 'info' | 'success' | 'error'
  description?: string
}

export type toastPropsType = toastProps
