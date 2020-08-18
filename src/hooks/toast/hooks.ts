import { useContext } from 'react'
import toastContext from './context'
import { toastContextData } from './types'

const useToast = (): toastContextData => {
  const context = useContext(toastContext)

  if (!context) {
    throw new Error('useAuth must be used  within as AuthProvider')
  }

  return context
}

export default useToast
