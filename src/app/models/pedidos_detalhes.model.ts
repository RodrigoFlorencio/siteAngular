export interface ResponsePedidosDetalhes {
    id?: number
    id_pedido: number
    id_produto: number
    id_preco: number
    quantidade: number
    sub_total: number
    imagem_produto: number
}

export interface RequestPedidosDetalhes {
    id?: number
    id_pedido: number
    id_produto: number
    id_preco: number
    quantidade: number
    sub_total: number
    imagem_produto: number
}

export interface RequestTeste {
    id?: number
    id_pedido: number
    qtd: number
}

export interface ResponseTeste {
    id?: number
    id_pedido: number
    qtd: number
}
