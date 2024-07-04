import React from 'react'
import { useDispatch } from 'react-redux'
import { useGetProdutosQuery } from '../services/api'
import { adicionarAoCarrinho, favoritar } from '../store/reducers/carrinho'
import { Produto as ProdutoType } from '../App'

const Produto: React.FC<{ produto: ProdutoType }> = ({ produto }) => {
  const dispatch = useDispatch()

  return (
    <div key={produto.id}>
      <h3>{produto.nome}</h3>
      <button onClick={() => dispatch(adicionarAoCarrinho(produto))}>
        Adicionar ao Carrinho
      </button>
      <button onClick={() => dispatch(favoritar(produto.id))}>
        {produto.isFavorited
          ? 'Remover dos Favoritos'
          : 'Adicionar aos Favoritos'}
      </button>
    </div>
  )
}

const Produtos: React.FC = () => {
  const { data: produtos, isLoading } = useGetProdutosQuery()

  if (isLoading) return <h2>Carregando...</h2>

  return (
    <div>
      {produtos?.map((produto: ProdutoType) => (
        <Produto key={produto.id} produto={produto} />
      ))}
    </div>
  )
}

export default Produtos
