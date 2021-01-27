import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProgressBarMode } from '@angular/material/progress-bar';

import { Pedidos } from 'src/app/models/pedidos.model';
import { PedidosService } from 'src/app/services/pedidos-detalhes.service';
import { AuthService } from 'src/app/services/auth.service';
import { ResponsePedidosDetalhes } from 'src/app/models/pedidos_detalhes.model';



@Component({
  selector: 'app-area-cliente',
  templateUrl: './area-cliente.component.html',
  styleUrls: ['./area-cliente.component.css']
})


export class AreaClienteComponent implements OnInit {

  mode: ProgressBarMode = 'determinate'
  value = []
  bufferValue = 75
  possui: boolean = false;
  aux: number = 0
  pedidos: Pedidos[] = []

  imgPedidos: ResponsePedidosDetalhes[] = []
  imgAux = 0
  id: Number

  constructor(private router: Router,
              private pedidosDetalhes: PedidosService,
              private users: AuthService) { }

  ngOnInit(): void {
    this.takeAllProducts()
    this.takeUser()
  }

  takeAllProducts() {
    this.pedidosDetalhes.getPedidos().subscribe((data) => {
      var i = 0;
      for (var contador = 0; contador < data['totalPedidos']; contador++) {
        if (this.usuario.id_usuario === data['pedido'][contador]["id_user"]) {
          this.pedidos[i] = data['pedido'][contador]

          this.possui = true

          var _status = this.pedidos[i]['status_entrega']
          this.verificaStatusPedido(_status, this.aux)
          this.pedidosDetalhes.getImgPedidos(this.pedidos[i].id_pedido).subscribe((data) => {

            this.imgPedidos[this.imgAux] = data['pedido']["detalhesImg"][this.imgAux].imagem[0]
            this.imgAux++;
          }, (error) => { console.log(error) })

          this.aux++
          i++
        }
      }
    }, (error) => { console.log(error) })
  }

  usuario;
  takeUser() {
    this.usuario = this.users.getCurrentUser();
  }

  verificaStatusPedido(_status, i) {
    if (_status == "pedido realizado") {
      this.value[i] = 25
    }
    if (_status == "pagamento confirmado") {
      this.value[i] = 50
    }
    if (_status == "saiu para entrega") {
      this.value[i] = 75
    }
    if (_status == "entregue") {
      this.value[i] = 100
    }
  }

}
