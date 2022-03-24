import React, { useContext, useState, useEffect } from 'react';

import { auth } from './Firebase';
const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const signup = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
    }
    const logOut = () => {
        return auth.signOut()
    }
    const resetPassword = (email) => {
        return auth.sendPasswordResetEmail(email)
    }
    const updateEmail = (email) => {
        return currentUser.updateEmail(email)
    }

    const updatePassword = (password) => {
        currentUser.updatePassword(password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setLoading(false)
            setCurrentUser(user)
        })
        return unsubscribe
    }, [])


    const value = {
        currentUser,
        signup,
        login,
        logOut,
        resetPassword,
        updateEmail,
        updatePassword
    }
   return (
      <AuthContext.Provider value={value}>
          {!loading && children}
      </AuthContext.Provider>
  )
}
