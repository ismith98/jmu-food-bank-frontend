import React, { useState, useContext, useEffect } from "react";
import { getCategories } from "../hooks/useFirebase";

const CategoriesContext = React.createContext();

export function useCategories() {
  return useContext(CategoriesContext);
}

export function CategoriesProvider({ children }) {
  const [categories, setCategories] = useState();

  useEffect(() => getCategories(setCategories), []);

  return (
    <CategoriesContext.Provider value={categories}>
      {children}
    </CategoriesContext.Provider>
  );
}
