import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  getAdditionalUserInfo,
} from "firebase/auth";
import { setDoc, doc, collection } from "firebase/firestore";

import { auth } from "../firebase";
import { db } from "./../firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const googleSignIn = () => {
    const googleProvider = new GoogleAuthProvider();

    signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        const additionalUserInfo = getAdditionalUserInfo(result);
        const isNewUser = additionalUserInfo.isNewUser;
        const userId = result.user.uid;
        if (isNewUser) {
          const myCollection = collection(db, "rank");
          const myDocumentData = {
            rank: 0,
          };
          const myDocRef = doc(myCollection, userId);
          await setDoc(myDocRef, myDocumentData);
        }
      })
      .catch((err) => alert(err.message));
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
