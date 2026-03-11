import { useEffect, useState } from 'react'
import type { UserData } from '../../Types/Auth'
import { AuthContext } from './AuthContext'

// TS - interface for the Provider
interface AuthContextProviderInterface {
  children: React.ReactNode
}

// Here the AuthContextProvider is created
// This is the provider we wrap our components in so they can access
// all the values/states we want to use across the entire app.
export const AuthContextProvider = ({ children }: AuthContextProviderInterface) => {
  const [userData, setUserData] = useState<UserData | null>(null)

  // A useEffect hook that runs when the component mounts (first load).
  // It checks if we have stored userData in localStorage,
  // parses it and saves it in the userData state.
  useEffect(() => {
    function getLocalUserState() {
      if (localStorage.getItem('userData')) {
        const json = JSON.parse(localStorage.getItem('userData')!)
        setUserData(json)
      }
    }
    getLocalUserState()
  }, [])

  // Checks if userData exists and saves it in localStorage
  useEffect(() => {
    if (userData !== null) localStorage.setItem('userData', JSON.stringify(userData))
  }, [userData])

  const logout = () => {
    if (localStorage.getItem('userData')) localStorage.removeItem('userData')

    setUserData(null)
  }

  // Returns AuthContext with all the values we want to use throughout the app
  return <AuthContext.Provider value={{ userData, setUserData, logout }}>{children}</AuthContext.Provider>
}