import React from 'react'

import { Container } from './styles'

import { useToast } from '../../hooks/toast'

import { useTransition } from 'react-spring'

import Toast from './Toast'

const ToastContainer: React.FC = () => {
  const { toasts } = useToast()

  const ToastWithTransitions = useTransition(toasts, toasts => toasts.id, {
    from: { right: '-200%', opacity: 0 },
    enter: { right: '0%', opacity: 1 },
    leave: { right: '-120%', opacity: 0 },
  })

  if (!toasts) {
    return <></>
  }

  return (
    <Container>
      {ToastWithTransitions.map(({ item, key, props }) => (
        <Toast key={key} data={item} style={props} />
      ))}
    </Container>
  )
}

export default ToastContainer
