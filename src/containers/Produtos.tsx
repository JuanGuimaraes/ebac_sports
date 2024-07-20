import React from 'react'
import { useDispatch } from 'react-redux'
import { useGetProdutosQuery } from '../services/api'
import { adicionarAoCarrinho, favoritar } from '../store/reducers/carrinho'
import { Produto as ProdutoType } from '../App'
import * as S from './styles'

export const paraReal = (valor: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    valor
  )

const Produto: React.FC<{ produto: ProdutoType }> = ({ produto }) => {
  const dispatch = useDispatch()

  return (
    <S.Produtos key={produto.id}>
      <S.Capa>
        <img src={produto.imagem} alt={produto.nome} />
      </S.Capa>
      <S.Titulo>{produto.nome}</S.Titulo>
      <S.Prices>
        <strong>{paraReal(produto.preco)}</strong>
      </S.Prices>
      <S.BtnComprar onClick={() => dispatch(adicionarAoCarrinho(produto))}>
        Adicionar ao Carrinho
      </S.BtnComprar>
      <S.BtnComprar onClick={() => dispatch(favoritar(produto.id))}>
        {produto.isFavorited
          ? 'Remover dos Favoritos'
          : 'Adicionar aos Favoritos'}
      </S.BtnComprar>
    </S.Produtos>
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
