import React from 'react'

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  Calendar,
} from './styles'

import { FiPower } from 'react-icons/fi'

import logoImg from '../../assets/svgs/logo.svg'
import { useAuth } from '../../hooks/auth'

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth()

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber-logo" />

          <Profile>
            <img
              src={user.avatar_url || 'https://github.com/Arthur-Rs.png'}
              alt="Avatar"
            />

            <div>
              <span>Bem-vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
        </Schedule>
        <Calendar />
      </Content>
    </Container>
  )
}

export default Dashboard
