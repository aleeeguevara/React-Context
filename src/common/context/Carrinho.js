import { createContext, useContext, useEffect, useState } from "react";

export const CarrinhoContext = createContext();
CarrinhoContext.displayName = "Carrinho";

export const CarrinhoProvider = ({children}) => {
  const [carrinho,setCarrinho] = useState([]);
  const [quantidadeProdutos, setQuantidadeProdutos] = useState(0);
  const [valorProdutos, setValorProdutos] = useState(0);
    return ( 
      <CarrinhoContext.Provider 
        value={{
          carrinho,
          setCarrinho,
          quantidadeProdutos,
          setQuantidadeProdutos,
          valorProdutos,
          setValorProdutos
        }}
      >
          {children}
      </CarrinhoContext.Provider>
    
    
    );
};

// fazer hook customizado para esse carrinho
export const useCarrinhoContext = () => {

    const {
      carrinho,
      setCarrinho,
      quantidadeProdutos,
      setQuantidadeProdutos,
      valorProdutos,
      setValorProdutos
    } = useContext(CarrinhoContext);


    function mudarQuantidade(id, quantidade) {
      return carrinho.map(itemDoCarrinho => {
      if(itemDoCarrinho.id === id) itemDoCarrinho.quantidade += quantidade; 
        return itemDoCarrinho;
      })
    }

    function adicionarProduto(novoProduto) {
        const temOProduto = carrinho.some(
          (itemDoCarrinho) => itemDoCarrinho.id === novoProduto.id
        );
        if (!temOProduto) {
          novoProduto.quantidade = 1;
          return setCarrinho((carrinhoAnterior) => [
            ...carrinhoAnterior,
            novoProduto,
          ]);
        }
        setCarrinho(mudarQuantidade(novoProduto.id, 1))
      }

      function removerProduto(id){
        const produto = carrinho.find(itemDoCarrinho => itemDoCarrinho.id === id);
        const ehOUltimo = produto.quantidade === 1;

        if(ehOUltimo){
          return setCarrinho(carrinhoAnterior => carrinhoAnterior.filter(item => item.id !== id))
        }
         
          setCarrinho(mudarQuantidade(id, -1));
      }


      //escutar o carrinho e sempre que o state mudar tem que fazer a contagem de produto
      //como é um listener, o react disponibiliza o useEffect
      useEffect(()=> {
        const { novoTotal, novaQuantidade } = carrinho.reduce((contador, produto) => ({ //reduce retorna objeto com 2, parenteses quer dizer que esta retornando e os colchetes que esta retornando um obj
          novaQuantidade: contador.novaQuantidade + produto.quantidade,
          novoTotal: contador.novoTotal + (produto.valor * produto.quantidade)
        }), {
          novaQuantidade: 0,
          novoTotal: 0
        });
        
        
        setQuantidadeProdutos(novaQuantidade);
        setValorProdutos(novoTotal);

      },[carrinho, setQuantidadeProdutos, setValorProdutos]);
    
    return {
     carrinho, 
     setCarrinho,
     adicionarProduto,
     removerProduto,
     quantidadeProdutos,
     valorProdutos
    
    };
}  