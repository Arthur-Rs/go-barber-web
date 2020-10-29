import React, { ButtonHTMLAttributes } from 'react'

import { Container } from './styles'

type IButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
}

const Button: React.FC<IButton> = ({ children, loading, ...rest }) => {
  return <Container {...rest}>{loading ? 'carregando...' : children}</Container>
}

export default Button
