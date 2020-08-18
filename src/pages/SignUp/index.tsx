import React, { useCallback, useRef } from 'react'
import { Container, Content, Background, AnimationContainer } from './styles'
import { Link, useHistory } from 'react-router-dom'
import { Form } from '@unform/web'
import * as yup from 'yup'
import { FormHandles } from '@unform/core'
import api from '../../services/api'
import { useToast } from '../../hooks/toast'

// => Components
import Button from '../../components/Button'
import Input from '../../components/Input'

// => SVG
import LogoImg from '../../assets/svgs/logo.svg'

// => Icons
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi'

// => Utils
import getValidationErros from '../../utils/getValidationErrors'

interface FormData {
  name: string
  email: string
  password: string
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const { push: goRoute } = useHistory()

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = yup.object().shape({
          name: yup.string().required('Nome obrigatório!'),
          email: yup
            .string()
            .email('E-mail invalido')
            .required('E-mail obrigatório'),
          password: yup.string().min(8, 'Mínimo de 8 caracteres'),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        const { name, email, password } = data

        await api.post('/users', {
          name,
          email,
          password,
        })

        addToast({
          title: 'Você foi cadastro com sucesso',
          description: 'Você já pode fazer o logon na aplicação',
          type: 'success',
        })

        goRoute('/')
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          const errors = getValidationErros(err)

          formRef.current?.setErrors(errors)

          return
        }

        addToast({
          title: 'Erro ao tentar fazer o cadastro',
          description: 'Não foi possível fazer o cadastro na aplicação',
          type: 'error',
        })
      }
    },
    [addToast, goRoute],
  )

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={LogoImg} alt="Logo GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>

            <Input name="name" type="text" icon={FiUser} placeholder="Nome" />
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
            <Button type="submit">Cadastrar</Button>
            <Link to="forgot">Esqueci minha senha</Link>
          </Form>
          <Link to="/">
            <FiArrowLeft />
            Voltar para logon
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  )
}

export default SignUp
