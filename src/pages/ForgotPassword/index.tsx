import React, { useCallback, useRef, useState } from 'react'
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
import { FiArrowLeft, FiMail } from 'react-icons/fi'

// => Utils
import getValidationErros from '../../utils/getValidationErrors'

// => Hooks
import { useToast } from '../../hooks/toast'

import Api from '../../services/api'

interface Iform {
  email: string
}

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const { push: goRoute } = useHistory()

  const [loading, setLoading] = useState(false)

  const handleSubmit = useCallback(
    async (data: Iform) => {
      try {
        setLoading(true)

        formRef.current?.setErrors({})

        const schema = yup.object().shape({
          email: yup
            .string()
            .email('E-mail invalido')
            .required('E-mail obrigatório'),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        Api.post('/password/forgot', {
          email: data.email,
        })

        addToast({
          title: 'Sucesso na recuperação de senha',
          description:
            'Um email com o link para recuperar a senha foi enviado para você!',
          type: 'success',
        })

        goRoute('/')
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          const errors = getValidationErros(err)

          formRef.current?.setErrors(errors)
        }

        addToast({
          title: 'Error ao tentar recuperar sua senha',
          description:
            'Não possível recuperar sua senha no momento, tente novamente!',
          type: 'error',
        })
      } finally {
        setLoading(false)
      }
    },
    [addToast, goRoute],
  )

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={LogoImg} alt="Logo GoBarber" />

          <Form onSubmit={handleSubmit} ref={formRef}>
            <h1>Recuperar senha</h1>

            <Input
              name="email"
              type="email"
              icon={FiMail}
              placeholder="Email"
            />
            <Button loading={loading} type="submit">
              Recuperar
            </Button>
          </Form>
          <Link to="/">
            <FiArrowLeft />
            Voltar ao login
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  )
}

export default ForgotPassword
