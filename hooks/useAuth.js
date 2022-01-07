import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as Google from "expo-google-app-auth";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import { ANDRIOD_CLIENTID, IOS_CLIENTID } from "@env";
const AuthContext = createContext({
  // initial state
});

// firebase config
const config = {
  androidClientId: ANDRIOD_CLIENTID,
  iosClientId: IOS_CLIENTID,
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
          console.log(loginResult);
          return Promise.reject();
        }
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      })
      .finally(() => setLoading(false));
  };

  const logout = () => {
    setLoading(true);
    signOut(auth)
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const memoedValue = useMemo(
    () => ({
      user,
      signInWithGoogle,
      loading,
      error,
      logout,
    }),
    [user, loading, error]
  );
  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
