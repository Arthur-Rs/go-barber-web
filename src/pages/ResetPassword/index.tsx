import React, { useCallback, useRef } from 'react'
import { Container, Content, Background, AnimationContainer } from './styles'
import { useHistory } from 'react-router-dom'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as yup from 'yup'

// => Components
import Button from '../../components/Button'
import Input from '../../components/Input'

// => SVG
import LogoImg from '../../assets/svgs/logo.svg'

// => Icons
import { FiLock } from 'react-icons/fi'

// => Utils
import getValidationErros from '../../utils/getValidationErrors'

// => Hooks
import { useToast } from '../../hooks/toast'

import Api from '../../services/api'

interface IForm {
  password: string
  password_confirmation: string
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const { push: goRoute } = useHistory()

  const handleSubmit = useCallback(
    async (data: IForm) => {
      try {
        formRef.current?.setErrors({})

        const schema = yup.object().shape({
          password: yup.string().min(8, 'Mínimo de 8 caracteres'),
          password_confirmation: yup
            .string()
            .oneOf([yup.ref('password')], 'As senhas não estão iguais'),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        await Api.post('/password/reset', {
          password: data.password,
          password_confirmation: data.password_confirmation,
          token: window.location.search.replace(/\?token=/, ''),
        })

        addToast({
          title: 'Senha recuperada com sucesso',
          type: 'success',
        })

        goRoute('/')
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          const errors = getValidationErros(err)

          formRef.current?.setErrors(errors)
        }

        addToast({
          title: 'Não foi possível redefinir sua senha',
          description:
            'Aconteceu algo deu errado ao tentar resetar sua senha, por favor, tente novamente!',
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

          <Form onSubmit={handleSubmit} ref={formRef}>
            <h1>Alterar senha</h1>
            <Input
              name="password"
              type="password"
              icon={FiLock}
              placeholder="Nova senha"
            />
            <Input
              name="password_confirmation"
              type="password"
              icon={FiLock}
              placeholder="Confirme sua senha"
            />
            <Button type="submit">Redefinir</Button>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  )
}

export default ResetPassword
