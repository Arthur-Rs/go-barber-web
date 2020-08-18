import React, { useCallback, useRef } from 'react'
import { Container, Content, Background, AnimationContainer } from './styles'
import { Link, useHistory } from 'react-router-dom'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as yup from 'yup'

// => Components
import Button from '../../components/Button'
import Input from '../../components/Input'

// => SVG
import LogoImg from '../../assets/svgs/logo.svg'

// => Icons
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'

// => Utils
import getValidationErros from '../../utils/getValidationErrors'

// => Hooks
import { useAuth } from '../../hooks/auth'
import { useToast } from '../../hooks/toast'

interface Iform {
  email: string
  password: string
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const { signIn } = useAuth()
  const { addToast } = useToast()
  const { push: goRoute } = useHistory()

  const handleSubmit = useCallback(
    async (data: Iform) => {
      try {
        formRef.current?.setErrors({})

        const schema = yup.object().shape({
          email: yup
            .string()
            .email('E-mail invalido')
            .required('E-mail obrigatório'),
          password: yup.string().min(8, 'Mínimo de 8 caracteres'),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        await signIn(data)

        addToast({
          title: 'Logon feito com sucesso',
          type: 'success',
        })

        goRoute('/dashboard')
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          const errors = getValidationErros(err)

          formRef.current?.setErrors(errors)
        }

        addToast({
          title: 'Error no login',
          description: 'Não possível fazer login',
          type: 'error',
        })
      }
    },
    [addToast, goRoute, signIn],
  )

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={LogoImg} alt="Logo GoBarber" />

          <Form onSubmit={handleSubmit} ref={formRef}>
            <h1>Faça seu logon</h1>

            <Input
              name="email"
              type="email"
              icon={FiMail}
              placeholder="Email"
            />
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
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  )
}

export default SignIn
