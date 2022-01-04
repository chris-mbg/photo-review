import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { BounceLoader } from "react-spinners";

const AuthContext = createContext();

const useAuthContext = () => useContext(AuthContext);

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false)
    });
  }, []);

  const values = {
    currentUser,
    loading,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={values}>
      {loading && (
        <div className="d-flex justify-content-center align-items-center py-5">
          <BounceLoader color="#0dcaf0" size={60} />
        </div>
      )}

      {!loading && children}
    </AuthContext.Provider>
  );
};

export { useAuthContext, AuthContextProvider as default };
