import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class PedidosService {

  private produtos: ProdutoResponseModel[] = []

  private produtosUrl = 'http://localhost:3002'

  constructor(private http: HttpClient) { }

  getPedidosOne(id_pedido: number) {
    return this.http.get<ProdutoResponseModel>(this.produtosUrl + '/pedidos' + id_pedido).toPromise()
  }
  
}

interface ProdutoResponseModel {

  id: number
  title: string
  description: string
  price: number
  quantityOrdered: number
  image: string

}
