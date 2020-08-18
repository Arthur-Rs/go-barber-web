import React, { useCallback } from 'react'
import { Container, Content, Background } from './styles'
import { Link } from 'react-router-dom'
import { Form } from '@unform/web'
import * as yup from 'yup'

// => Components
import Button from '../../components/Button'
import Input from '../../components/Input'

// => SVG
import LogoImg from '../../assets/svgs/logo.svg'

// => Icons
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'

interface Iform {
  email: string
  password: string
}

const SignIn: React.FC = () => {
  const handleSubmit = useCallback((data: Iform): void => {}, [])

  return (
    <Container>
      <Content>
        <img src={LogoImg} alt="Logo GoBarber" />

        <Form onSubmit={handleSubmit}>
          <h1>Faça seu logon</h1>

          <Input name="email" type="email" icon={FiMail} placeholder="Email" />
          <Input
            name="password"
            type="password"
            icon={FiLock}
            placeholder="Senha"
          />
          <Button type="submit">Entrar</Button>
          <Link to="forgot">Esqueci minha senha</Link>
        </Form>
        <Link to="sighup">
          <FiLogIn />
          Criar conta
        </Link>
      </Content>
      <Background />
    </Container>
  )
}

export default SignIn
