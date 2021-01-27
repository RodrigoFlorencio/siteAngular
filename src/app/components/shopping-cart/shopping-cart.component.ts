import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CartService } from './../../services/cart.service';
import { ProdutosService } from 'src/app/services/produtos.service';
import { Produtos, Teste, Teste1, Ticket } from 'src/app/models/produtos.model';
import { RequestFrete } from 'src/app/models/address.model';
import { RequestTeste, ResponseTeste } from 'src/app/models/pedidos_detalhes.model';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})


export class ShoppingCartComponent implements OnInit {

  url = 'http://localhost:3002/teste'

  produtos: Produtos

  existingCartItems = []

  ticket: Ticket[]

  items

  quantity: any

  total = 0

  subtotal

  valorTotal = 0

  disabled: boolean = false
  
  valorFrete

  usuario = []

  public insertFrete: RequestFrete = {
    nCdServico: 40010,
    sCepOrigem: '05316900',
    sCepDestino: '',
    nVlPeso: 1,
    nCdFormato: 1,
    nVlComprimento: 27,
    nVlAltura: 8,
    nVlLargura: 10,
    nVlDiametro: 18
  }

  constructor(private router: Router,
              public cartService: CartService,
              private produtosService: ProdutosService,
              private http: HttpClient) { }

  ngOnInit(): void {

    this.existingCartItems = JSON.parse(localStorage.getItem('products'))
    this.items = this.cartService.items$ != undefined ? this.existingCartItems : this.cartService.items$

    this.usuario = JSON.parse(localStorage.getItem("currentUser"))

    this.produtosService.getProducts().subscribe((data) => {
      this.produtos = data['produtos']
    }, (error) => { console.log(error) })

    this.produtosService.getTicket().subscribe((data) => {
      this.ticket = data['tickets']
    }, (error) => { console.log(error) })

    if (this.items['products'] == undefined) {
      this.items = this.existingCartItems
      this.total = this.existingCartItems.length
    } else {
      this.items = this.items['products'].length <= 0 ? this.items['source']['value']['products'] : this.existingCartItems['products']
      this.total = this.items.length <= 0 ? this.items['length'] : this.existingCartItems['products'].length
    }

    var auxSub
    var arrSub = []

    for (let cont = 0; cont < this.total; cont++) {
      auxSub = this.items[cont].carrinhoQuantity * this.items[cont]['preco']
      arrSub.push(auxSub)
    }

    this.subtotal = arrSub.reduce((acumulador, elemento) => acumulador += elemento)
    this.valorTotal = this.subtotal

    this.cepPost()
  }

  somarTotal(valorFrete) {
    this.valorTotal = valorFrete + this.valorTotal
  }

  cepPost() {
    this.produtosService.frete(this.insertFrete).subscribe(result => {
      this.valorFrete = result
      this.disabled = true
      this.somarTotal(parseFloat(this.valorFrete[0].Valor.replaceAll(',', '.')));
    })
  }

  storageAdd() {
    var add = {
      frete: this.valorFrete,
      valorTotal: this.valorTotal.toFixed(2),
      subTotal: this.subtotal
    }

    localStorage.setItem('complementaryInfo', JSON.stringify(add))
  }

  ChangeQuantity(id: number, increaseQuantity: boolean) {
    this.UpdateCartItens(id, increaseQuantity)

    var auxSub;
    var arrSub = []

    for (let cont = 0; cont < this.total; cont++) {
      auxSub = this.items[cont].carrinhoQuantity * this.items[cont]['preco']
      arrSub.push(auxSub)
    }

    this.subtotal = arrSub.reduce((acumulador, elemento) => acumulador += elemento)
    this.valorTotal = this.subtotal
  }

  UpdateCartItens(index, increase: Boolean) {
    let data = this.items
    if (increase) {
      // @ts-ignore
      data[index].carrinhoQuantity = data[index].carrinhoQuantity + 1
      data[index].quantidade = data[index].quantidade - 1
      localStorage.setItem('products', JSON.stringify(data))
    } else {
      data[index].carrinhoQuantity = data[index].carrinhoQuantity - 1
      data[index].quantidade = data[index].quantidade + 1

      if (data[index].carrinhoQuantity < 1) {

        //procurar a posição do item no array
        var pos = data.indexOf(data[index]);

        // removedo o item pela posição do array
        var itensRemovidos = data.splice(pos, 1)
        console.log(data)

        localStorage.setItem('products', JSON.stringify(data))

        this.router.navigate(['/shop-cart']).then(nav => {
          window.location.reload()
        })

      } else {
        localStorage.setItem('products', JSON.stringify(data))
      }
    }
  }

  public addTeste: Teste1 = {
    cep: null,
    logradouro: 'Rua Iguatama',
    numero: '415',
    complemento: 'Estação de trem',
    bairro: 'Guaianases',
    cidade: 'São Paulo',
    uf: 'SP',
    tel: null
  }
  endereco
  arrr
  id_pedido
  // Pega dados do pedido para armazenar no banco
  getStoage() {
    this.arrr = {
      frete: this.valorFrete,
      valorTotal: this.valorTotal,
      subTotal: this.subtotal,
      user: this.usuario,
      endereco: this.addTeste,
    }

    this.produtosService.createPedido(this.arrr).subscribe((data) => {
      debugger
      // this.id_pedido = data['pedidoCriado'].id
      debugger
      var pedido = [
        {
          produtos: this.existingCartItems,
          idPedido: data['pedidoCriado'].id
        }
      ]
      debugger
      this.produtosService.createPedidosDetalhes(pedido).subscribe(() => {
        this.produtosService.showMessage('Pedido detalhado enviado com sucesso!')
      })
    })

  }

}
