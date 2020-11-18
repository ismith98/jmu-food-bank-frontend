import React, { useState, useContext } from "react";
import firebase from "firebase";

const FirebaseContext = React.createContext();

export function useFirebase() {
  return useContext(FirebaseContext);
}

export default function FirebaseProvider({ children }) {
  return (
    <FirebaseContext.Provider value={{}}>{children}</FirebaseContext.Provider>
  );
}
