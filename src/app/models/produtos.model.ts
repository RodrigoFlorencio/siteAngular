export interface Produtos {
    id?: number
    nome: string
    preco: number
    categoria: number
    tipo: string
    descricao: string
    quantidade: number
    id_fornecedor: number
    id_imagem: string
    carrinhoQuantity: Number
    imagem: string
}

export interface Teste {
    id?: number
    qtd: number
}

export interface Teste1 {
    
    cep: number
    logradouro: string
    numero: string
    complemento: string
    bairro: string
    cidade: string
    uf: string
    tel: number
}

export interface serverResponse {
    count: number;
    produtos: Produtos[]
}

export class Item {

    product: Produtos;
    quantity: number;

}

export class Ticket {
    id?: number
    valor: number
}

