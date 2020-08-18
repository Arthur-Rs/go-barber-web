import { createContext } from 'react'
import { toastContextData } from './types'

const toastContext = createContext<toastContextData>({} as toastContextData)

export default toastContext
