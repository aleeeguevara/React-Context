import React, { createContext, useState } from "react";

export const UsuarioContext = createContext();
UsuarioContext.displayName="Usuário";


export const UsuarioProvider = ({ children }) => { //props.children = é a props default react dos componentes que passar pro provider
  const [nome, setNome] = useState("");
  const [saldo, setSaldo] = useState(0);
  return (
    <UsuarioContext.Provider value={{ nome, setNome, saldo, setSaldo }}>
      {children} 
    </UsuarioContext.Provider>
  );
};
 