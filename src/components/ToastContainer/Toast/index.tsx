import React, { useEffect, CSSProperties } from 'react'

import { Container } from './styles'

import { FiAlertCircle, FiCheckCircle, FiInfo, FiXCircle } from 'react-icons/fi'

import { useToast, toastProps } from '../../../hooks/toast'

interface ToastProps {
  data: toastProps
  style: CSSProperties
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />,
}

const Toast: React.FC<ToastProps> = ({
  data: { id, title, description, type },
  style,
}) => {
  const { removeToast } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id)
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [id, removeToast])

  return (
    <Container style={style} hasDescription={Number(!!description)} type={type}>
      {icons[type || 'info']}
      <div>
        <strong>{title}</strong>
        {description && <p>{description}</p>}
      </div>
      <button
        onClick={() => {
          removeToast(id)
        }}
        type="button"
      >
        <FiXCircle size={18} />
      </button>
    </Container>
  )
}

export default Toast
