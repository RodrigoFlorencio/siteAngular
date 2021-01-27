import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { Produtos } from '../models/produtos.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, take } from 'rxjs/operators';
import { RequestTeste, ResponseTeste } from '../models/pedidos_detalhes.model';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  pedidosURL = 'http://localhost:3002/pedidos-detalhes'

  constructor(private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar) {
    let existingCartItems = JSON.parse(localStorage.getItem('products'))
    if (!existingCartItems) {
      existingCartItems = []
    }
    this.itemsSubject.next(existingCartItems)
  }

  number = 0;
  finalOut = []
  private itemsSubject = new BehaviorSubject<Produtos[]>([]);
  items$ = this.itemsSubject.asObservable()

  addToCart(product: Produtos) {
    this.items$.pipe(
      take(1),
      map((produtos) => {

        if (produtos.length == 0) {
          produtos.push(product)

          produtos.forEach((value) => {
            if (!this.finalOut.some(x => (x.id === value.id))) {
              value.carrinhoQuantity = 1
              value.quantidade = value.quantidade -1
              this.finalOut.push(value)
            }
          })
        }
        else {
          produtos['products'].push(product)

          produtos['products'].forEach((value) => {
            if (!this.finalOut.some(x => (x.id === value.id))) {
              value.carrinhoQuantity = 1
              this.finalOut.push(value)
            }
          })

        }


        var item = {
          products: this.finalOut,
        }

        localStorage.setItem('products', JSON.stringify(item))
      }),
    ).subscribe()

    this.showMessage('Produto adicionado ao carrinho')
  }

  pedidosPost(request: RequestTeste): Observable<ResponseTeste> {
    return this.http.post<ResponseTeste>(this.pedidosURL, request)
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
