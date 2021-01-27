export interface Address {
    
    address_cep: string;
    address_endereco: string;
    address_numero: string;
    address_complemento: string;
    address_bairro:string;
    address_cidade: string;
    address_estado: string;
    address_telefone: string;

}

export interface Frete {

    frete_sCepOrigem: string;
    frete_sCepDestino: string;
    frete_nVlPeso: string;
    frete_nCdFormato: string;
    frete_nVlComprimento: string;
    frete_nVlAltura: string;
    frete_nVlLargura: string;
    frete_nCdServico: string;
    frete_nVlDiametro: string;

}

export interface ResponseFrete {

    nCdServico: number
    sCepOrigem: string
    sCepDestino: string
    nVlPeso: number
    nCdFormato: number
    nVlComprimento: number
    nVlAltura: number
    nVlLargura: number
    nVlDiametro: number
    
}

export interface RequestFrete {

    nCdServico: number
    sCepOrigem: string
    sCepDestino: string
    nVlPeso: number
    nCdFormato: number
    nVlComprimento: number
    nVlAltura: number
    nVlLargura: number
    nVlDiametro: number

}

export interface RequestCep {

    cep: string
    logradouro: string
    complemento: string
    bairro: string
    cidade: string
    uf: string

}
