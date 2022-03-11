import React, { useState, createContext, useContext } from "react";

export const PagamentoContext = createContext();
PagamentoContext.displayName = "Pagamento";

export const PagamentoProvider= ({ children }) => {
    const tiposDePagamento = [{  // array estático
            nome: "Boleto",
            juros: 1,
            id: 1
        },{
            nome: "Cartão de Crédito",
            juros: 1.3,
            id: 2
        },{
            nome: "PIX",
            juros: 1, 
            id: 3
        },{
            nome: "Crediário",
            juros: 1.5,
            id: 4
        }

    ];

    const [formaPagamento, setFormaPagamento] = useState(tiposDePagamento[0])

    return(
        <PagamentoContext.Provider value={{
            tiposDePagamento,
            formaPagamento,
            setFormaPagamento
        }}>
            {children}
        </PagamentoContext.Provider>
    )
}

export const usePagamentoContext = () => {
    const { 
        tiposDePagamento,
        formaPagamento,
        setFormaPagamento } = useContext(PagamentoContext);

        function mudarFormaDePagamento(id){
            const pagamentoAtual = tiposDePagamento.find(pagamento => pagamento.id === id);

            setFormaPagamento(pagamentoAtual);
        }
    
    return {
        tiposDePagamento,
        formaPagamento,
        mudarFormaDePagamento,
    }
}