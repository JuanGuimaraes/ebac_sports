import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Produto } from '../../App'

type CarrinhoState = {
  produtos: Produto[]
}

const initialState: CarrinhoState = {
  produtos: []
}

const carrinhoSlice = createSlice({
  name: 'carrinho',
  initialState,
  reducers: {
    adicionarAoCarrinho: (state, action: PayloadAction<Produto>) => {
      const produto = action.payload
      if (!state.produtos.find((p) => p.id === produto.id)) {
        state.produtos.push(produto)
      } else {
        alert('Item já adicionado')
      }
    },
    favoritar: (state, action: PayloadAction<number>) => {
      const produtoId = action.payload
      const produto = state.produtos.find((p) => p.id === produtoId)
      if (produto) {
        produto.isFavorited = !produto.isFavorited
      }
    }
  }
})

export const { adicionarAoCarrinho, favoritar } = carrinhoSlice.actions
export default carrinhoSlice.reducer
