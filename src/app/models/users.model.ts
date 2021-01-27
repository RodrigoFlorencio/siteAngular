export interface RequestCreate {
    id?: number
    nome: string
    sobrenome: string
    nascimento: number
    cpf: number
    email: string
    cep: number
    logradouro: string
    numero: string
    complemento: string
    bairro: string
    cidade: string
    uf: string
    tel: number
    senha: string
}

export interface ResponseCreate {
    id?: number
    nome: string
    sobrenome: string
    nascimento: number
    cpf: number
    email: string
    cep: number
    logradouro: string
    numero: string
    complemento: string
    bairro: string
    cidade: string
    uf: string
    tel: number
    senha: string
}
