import React, { useContext, useState, useEffect } from 'react'
import { auth, providerGoogle } from '../firebase'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      console.log(user)
    })
    return unsubscribe
  }, [])
  function login() {
    auth
      .signInWithPopup(providerGoogle)
      .then(({ user }) => {
        setCurrentUser(user)
        return user.getIdToken().then(idToken => {
          return fetch('/sessionLogin', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
              //'CSRF-Token': Cookies.getItem('XSRF-TOKEN')
            },
            body: JSON.stringify({ idToken })
          })
        })
      })
      .then(() => {
        return auth.signOut()
      })
      .then(() => {
        //window.location.assign('/profile')
      })
  }

  const value = {
    currentUser,
    login
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
