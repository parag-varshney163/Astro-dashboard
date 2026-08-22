// QCPageContext.js
import { createContext, useContext, useState } from "react";
import React from "react";


const QCPageContext = createContext();

export const QCPageProvider = ({ children }) => {
  const [page, setPage] = useState(1);

  return (
    <QCPageContext.Provider value={{ page, setPage }}>
      {children}
    </QCPageContext.Provider>
  );
};

export const useQCPage = () => useContext(QCPageContext);
