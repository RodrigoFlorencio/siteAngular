import { Produtos } from './produtos.model';

export interface CartModelServer {

    total: number
    data: [{
        produto: Produtos,
        numInCart: number
    }]

}

export interface CartModelPublic {

    total: number
    prodData: [{
        id: number,
        incart: number
    }]

}
