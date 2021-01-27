import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedidos } from '../models/pedidos.model';
import { ResponsePedidosDetalhes } from '../models/pedidos_detalhes.model';

@Injectable({
  providedIn: 'root'
})


export class PedidosService {

  serverURL = 'http://localhost:3002'

  pedidos: Pedidos[]

  imgPedidos: ResponsePedidosDetalhes[]

  constructor(private http: HttpClient) { }

  public getPedidos(): Observable<Pedidos[]> {
    return this.http.get<Pedidos[]>(`${this.serverURL}/pedidos`)
  }

  public getImgPedidos(id: Number): Observable<ResponsePedidosDetalhes[]> {
    return this.http.get<ResponsePedidosDetalhes[]>(this.serverURL + '/pedidos-detalhes/' + id)
  }

}
