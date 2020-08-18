import React, { useCallback, useState } from 'react'

import { uuid } from 'uuidv4'

import toastContext from './context'

import ToastContainer from '../../components/ToastContainer'

import { toastProps } from './types'

const ToastProvider: React.FC = ({ children }) => {
  const [toasts, setToasts] = useState<toastProps[]>([])

  const addToast = useCallback(
    ({ title, description, type }: Omit<toastProps, 'id'>) => {
      const id = uuid()

      const data: toastProps = {
        id,
        title,
        description,
        type,
      }

      setToasts(state => [...state, data])
    },
    [],
  )
  const removeToast = useCallback(
    (id: string) => {
      const filterToasts = toasts.filter(toast => toast.id !== id)
      setToasts(() => filterToasts)
    },
    [toasts],
  )

  return (
    <toastContext.Provider
      value={{
        addToast,
        removeToast,
        toasts,
      }}
    >
      {children}
      <ToastContainer />
    </toastContext.Provider>
  )
}

export default ToastProvider
