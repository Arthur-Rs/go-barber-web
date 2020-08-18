import React, { ButtonHTMLAttributes } from 'react'

import { Container } from './styles'

type Ibutton = ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<Ibutton> = ({ ...rest }) => {
  return <Container {...rest} />
}

export default Button
