import React, { createContext, useState } from "react";

export const UsuarioContext = createContext();
UsuarioContext.displayName="Usuário"; // nome que vai aparecer no react devtool


export const UsuarioProvider = ({ children }) => { //props.children = é a props default react dos componentes que passar pro provider
  const [nome, setNome] = useState("");
  const [saldo, setSaldo] = useState(0);
  return (
    <UsuarioContext.Provider value={{ nome, setNome, saldo, setSaldo }}>
      {children} 
    </UsuarioContext.Provider>
  );
};
 
//criamos componente customizado que tem responsabilidade de ter states e disponibilizar o provider para outros lugares