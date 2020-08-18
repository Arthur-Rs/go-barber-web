import React, { useCallback, useRef } from 'react'
import { Container, Content, Background } from './styles'
import { Link } from 'react-router-dom'
import { Form } from '@unform/web'
import * as yup from 'yup'
import { FormHandles } from '@unform/core'

// => Components
import Button from '../../components/Button'
import Input from '../../components/Input'

// => SVG
import LogoImg from '../../assets/svgs/logo.svg'

// => Icons
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi'

// => Utils
import getValidationErros from '../../utils/getValidationErrors'

interface Iform {
  name: string
  email: string
  password: string
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const handleSubmit = useCallback(async (data: Iform) => {
    try {
      formRef.current?.setErrors({})

      const schema = yup.object().shape({
        name: yup.string().required('É necessários informar o seu nome!'),
        email: yup
          .string()
          .email('Seu e-mail não válido')
          .required('É necessários informar um e-mail!'),
        password: yup
          .string()
          .min(8, 'Sua senha precisa ter mais de 8 caracteres'),
      })

      await schema.validate(data, {
        abortEarly: false,
      })
    } catch (err) {
      const errors = getValidationErros(err)

      formRef.current?.setErrors(errors)
    }
  }, [])

  return (
    <Container>
      <Content>
        <img src={LogoImg} alt="Logo GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu cadastro</h1>

          <Input name="name" type="text" icon={FiUser} placeholder="Nome" />
          <Input name="email" type="email" icon={FiMail} placeholder="Email" />
          <Input
            name="password"
            type="password"
            icon={FiLock}
            placeholder="Senha"
          />
          <Button type="submit">Cadastrar</Button>
          <Link to="forgot">Esqueci minha senha</Link>
        </Form>
        <Link to="/">
          <FiArrowLeft />
          Voltar para logon
        </Link>
      </Content>
      <Background />
    </Container>
  )
}

export default SignUp
