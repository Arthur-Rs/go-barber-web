import React, { useCallback, useState, useEffect } from 'react'
import client from '../../services/api'
import { signInRequest, signInResponse } from './types'
import AuthContext from './context'

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<signInResponse>({} as signInResponse)

  useEffect(() => {
    const token = localStorage.getItem('@GoBarber:token')
    const user = JSON.parse(String(localStorage.getItem('@GoBarber:user')))

    if (!token || !user) {
      return
    }

    setData({ token, user })
  }, [])

  const signOut = useCallback(async () => {
    localStorage.removeItem('@GoBarber:token')
    localStorage.removeItem('@GoBarber:user')
    setData({} as signInResponse)
  }, [])

  const signIn = useCallback(async ({ email, password }: signInRequest) => {
    const { data } = await client.post<signInResponse>('/session', {
      email,
      password,
    })

    const { token, user } = data

    localStorage.setItem('@GoBarber:token', token)
    localStorage.setItem('@GoBarber:user', JSON.stringify(user))
    setData({ token, user })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        name: 'user',
        signIn,
        user: data.user,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
