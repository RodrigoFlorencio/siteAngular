import { Produtos, Teste, Teste1, Ticket } from '../models/produtos.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { RequestCep, ResponseFrete } from '../models/address.model';
import { catchError, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from './cart.service';


@Injectable({
  providedIn: 'root'
})


export class ProdutosService {

  serverURL = 'http://localhost:3002/'

  updateUrl = 'http://localhost:3002/produtos/updateEstoque'

  url = 'http://localhost:3002/frete/'

  urlCep = 'http://localhost:3002/cep/'

  urlTeste = 'http://localhost:3002/teste/'

  produtos: Produtos[]

  teste: Teste[]

  arr = []

  constructor(private http: HttpClient,
              private snackBar: MatSnackBar,
              private cart: CartService) { }

  public getProducts(): Observable<Produtos[]> {
    return this.http.get<Produtos[]>(`${this.serverURL}produtos`)
  }

  car() {
    this.arr = JSON.parse(localStorage.getItem('products'))
  }

  public getTicket(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.serverURL}ticket`)
  }

  frete(frete: ResponseFrete): Observable<ResponseFrete> {
    return this.http.post<ResponseFrete>(this.url, frete).pipe(
      map((obj) => obj)
    )
  }

  cep(cep: RequestCep): Observable<ResponseFrete> {
    return this.http.post<ResponseFrete>(this.urlCep, cep).pipe(
      map((obj) => obj)
    )
  }

  getProdutoOne(id: number): Observable<Produtos> {
    return this.http.get<Produtos>(this.serverURL + 'produtos/' + id)
  }

  public createPedido(arrr): Observable<Teste1> {
    return this.http.post<Teste1>("http://localhost:3002/pedidos/id", arrr)
  }

  public createPedidosDetalhes(arr): Observable<Teste1> {
    return this.http.post<Teste1>("http://localhost:3002/pedidos-detalhes/id", arr)
  }

  public up(pedido): Observable<Teste1> {
    return this.http.post<Teste1>("http://localhost:3002/produtos/updateEstoque/id", pedido)
  }

  update(produto: Produtos): Observable<Produtos> {
    const url = `${this.updateUrl}/${produto.id}`
    return this.http.post<Produtos>(url, produto).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    )
  }

  errorHandler(e: any): Observable<any> {
    console.log(e)
    this.showMessage('Ocorreu um erro!', true)
    return EMPTY
  }

  showMessage(msg: string, isErro: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 4000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isErro ? ['msg-erro'] : ['msg-success']
    })
  }

}
