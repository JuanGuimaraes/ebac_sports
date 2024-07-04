import React from 'react'
import * as S from './styles'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store'
import cesta from '../../assets/cesta.png'

const paraReal = (valor: number): string => {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const Header: React.FC = () => {
  const dispatch = useDispatch()
  const itens = useSelector((state: RootState) => state.carrinho.produtos)
  const favoritos = itens.filter((item) => item.isFavorited)

  const valorTotal = itens.reduce((acc, item) => {
    acc += item.preco
    return acc
  }, 0)

  return (
    <S.Header>
      <h1>EBAC Sports</h1>
      <div>
        <span>{favoritos.length} favoritos</span>
        <img src={cesta} alt="Cesta de compras" />
        <span>
          {itens.length} itens, valor total: {paraReal(valorTotal)}
        </span>
      </div>
    </S.Header>
  )
}

export default Header
