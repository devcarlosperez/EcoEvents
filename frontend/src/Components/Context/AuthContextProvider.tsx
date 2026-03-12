import { useState } from 'react'
import type { UserData } from '../../Types/Auth'
import { AuthContext } from './AuthContext'

interface AuthContextProviderInterface {
  children: React.ReactNode
}

function decodeToken(token: string): UserData | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return { id: payload.id, name: payload.name ?? '', surname: payload.surname ?? '', email: payload.email, role: payload.role, token }
  } catch {
    return null
  }
}

export const AuthContextProvider = ({ children }: AuthContextProviderInterface) => {
  const [userData, setUserData] = useState<UserData | null>(() => {
    const token = localStorage.getItem('token')
    return token ? decodeToken(token) : null
  })

  const handleSetUserData = (data: UserData | null) => {
    if (data) {
      localStorage.setItem('token', data.token)
    }
    setUserData(data)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUserData(null)
  }

  return <AuthContext.Provider value={{ userData, setUserData: handleSetUserData, logout }}>{children}</AuthContext.Provider>
}