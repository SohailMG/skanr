import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as Google from "expo-google-app-auth";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";
import { ANDRIOD_CLIENTID, IOS_CLIENTID } from "@env";
import { signInWithEmailAndPassword } from "firebase/auth";
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
  const [errorMsg, setErrorMsg] = useState(null);

  // runs once the component mounts
  useEffect(() => {
    // Tracking user's sign in state
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // user is logged
        setUser(user);
      } else {
        setUser(null);
      }
      setLoadingInitial(false);
    });
  }, [user]);

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
      .catch((error) => {
        console.log(error);
        setError(error);
      })
      .finally(() => setLoading(false));
  };

  const createAccountAndLogin = async (email, password, fullName, avatar) => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password).catch((err) =>
        console.log(err)
      );
      await updateProfile(auth.currentUser, {
        displayName: fullName,
        photoURL: avatar,
      }).catch((err) => console.log(err));
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(credentials.user);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(credentials.user);
    } catch (err) {
      console.log(err.message.includes("wrong-password"));
      if (err.message.includes("wrong-password"))
        setErrorMsg("Invalid password");
      setError(error);
      if (err.message.includes("user-not-found"))
        setErrorMsg("Email doesn't exist'");
      setError(error);
    }
    setLoading(false);
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
      loginUser,
      signInWithGoogle,
      createAccountAndLogin,
      loading,
      error,
      logout,
      errorMsg,
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
