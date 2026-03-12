import { useState, type Dispatch, type SetStateAction } from 'react'
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

  const handleSetUserData: Dispatch<SetStateAction<UserData | null>> = (data) => {
    // Soportar tanto valor directo como updater function
    if (typeof data === 'function') {
      setUserData((prev) => {
        const next = (data as (prev: UserData | null) => UserData | null)(prev)
        if (next) {
          localStorage.setItem('token', next.token)
        } else {
          localStorage.removeItem('token')
        }
        return next
      })
    } else {
      if (data) {
        localStorage.setItem('token', data.token)
      } else {
        localStorage.removeItem('token')
      }
      setUserData(data)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUserData(null)
  }

  return <AuthContext.Provider value={{ userData, setUserData: handleSetUserData, logout }}>{children}</AuthContext.Provider>
}