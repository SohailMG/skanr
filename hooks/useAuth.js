import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import * as Google from "expo-google-app-auth";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext({
  // initial state
});

// firebase config
const config = {
  androidClientId:
    "498207515476-579d4moqa8inc8nbrk0qusdt49liua1h.apps.googleusercontent.com",
  iosClientId:
    "498207515476-535gi2up0moaubl8glf87pgbk270k7o4.apps.googleusercontent.com",
  scopes: ["profile", "email"],
  permissions: ["public_profile", "email", "gender", "location"],
};
export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // user is logged
        setUser(user);
      } else {
        setUser(null);
      }
      setLoadingInitial(false);
    });
  }, []);

  const signInWithGoogle = async () => {
    setLoading(true);
    await Google.logInAsync(config)
      .then(async (loginResult) => {
        if (loginResult.type === "success") {
          // login user
          const { idToken, accessToken } = loginResult;
          const credentials = GoogleAuthProvider.credential(
            idToken,
            accessToken
          );
          await signInWithCredential(auth, credentials);
        } else {
          // show error message
          return Promise.reject();
        }
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const logout = () => {
    setLoading(true);
    signOut(auth)
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const memoedValue = useMemo(()=>({
      user, signInWithGoogle, loading, error, logout

  }),[user,loading,error])
  return (
    <AuthContext.Provider value={ memoedValue }>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
