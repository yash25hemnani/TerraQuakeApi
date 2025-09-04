import { useState } from 'react'
import { Context } from './context'

export const AuthProvider = ({ children }) => {
  const [userLogin, setUserLogin] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <Context.Provider
      value={{
        userLogin,
        setUserLogin,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      { children }
    </Context.Provider>
  )
}