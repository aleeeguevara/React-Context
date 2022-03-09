import { Button, Snackbar, InputLabel } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useCarrinhoContext } from 'common/context/Carrinho';
import { UsuarioContext } from 'common/context/Usuario';
import Produto from 'components/Produto';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Voltar, TotalContainer, PagamentoContainer} from './styles';

function Carrinho() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { valorProdutos, carrinho } = useCarrinhoContext()
  const { saldo } = useContext(UsuarioContext);
  const history = useHistory();
  return (
    <Container>
      <Voltar onClick={() => history.goBack('/feira')}/>
      <h2>
        Carrinho
      </h2>
      {carrinho.map(produto => (
        <Produto
          {...produto}
          key={produto.id}
        />
      ))}
      <PagamentoContainer>
        <InputLabel> Forma de Pagamento </InputLabel>
      </PagamentoContainer>
      <TotalContainer>
          <div>
            <h2>Total no Carrinho: </h2>
            <span>R$ {Math.floor(valorProdutos)} </span>
          </div>
          <div>
            <h2> Saldo: </h2>
            <span> R$ {saldo} </span>
          </div>
          <div>
            <h2> Saldo Total: </h2>
            <span> R$ {Math.ceil(saldo - valorProdutos)}</span>
          </div>
        </TotalContainer>
      <Button
        onClick={() => {
          setOpenSnackbar(true);
        }}
        color="primary"
        variant="contained"
      >
         Comprar
       </Button>
        <Snackbar
          anchorOrigin={
            { 
              vertical: 'top',
              horizontal: 'right'
            }
          }
          open={openSnackbar}
          onClose={() => setOpenSnackbar(false)}
        >
           <MuiAlert
            onClose={() => setOpenSnackbar(false)}
            severity="success"
          >
            Compra feita com sucesso!
          </MuiAlert>
        </Snackbar>
    </Container>
  )
}

export default Carrinho;