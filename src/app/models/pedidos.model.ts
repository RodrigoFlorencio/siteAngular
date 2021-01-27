export interface Pedidos {
    id?: number
    id_pedido: number
    id_produto: number
    sub_total: number
    total: number
    frete: number
    desconto: number
    status_entrega: string
    pagamento_tipo: string
    parcelamneto: number
    nome_user: string
    entrega_tipo: string
    entrega_prazo: string
    cep: string
    endereco: string
    numero: string
    complemento?: string
    bairro: string
    cidade: string
    uf: string
    id_user? : number
}
