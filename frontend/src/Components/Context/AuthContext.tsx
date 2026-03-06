import { createContext, type SetStateAction } from 'react'
import type { UserData } from '../../Types/types'

// TS - inteface til typer
interface AuthContextProps {
  userData: UserData | null
  setUserData: React.Dispatch<SetStateAction<UserData | null>>
  logout: () => void
}

// Opret context og kald den AuthContext
export const AuthContext = createContext<AuthContextProps>((undefined)!)