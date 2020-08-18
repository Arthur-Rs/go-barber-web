import React from 'react'

import { Container } from './styles'

interface Itooltip {
  title: string
  className?: string
}

const Tooltip: React.FC<Itooltip> = ({ title, className, children }) => {
  return (
    <Container className={className}>
      <span>{title}</span>
      {children}
    </Container>
  )
}

export default Tooltip
