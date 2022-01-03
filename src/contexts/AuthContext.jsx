import { createContext, useContext, useState,useEffect } from "react"
import { auth } from "../firebase"
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { BounceLoader } from "react-spinners"

const AuthContext = createContext()

const useAuthContext = () => useContext(AuthContext)

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)


  const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password)



  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })
  }, [])

  const values = {
    currentUser,
    loading,
    signup
  }

  return (
    <AuthContext.Provider value={values}>
      {loading && (<BounceLoader />)}

      {!loading && children}
    </AuthContext.Provider>
  )
}

export { useAuthContext, AuthContextProvider as  default }