import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner'
import { Address, RequestCep } from 'src/app/models/address.model'
import { AddressService } from 'src/app/services/address.service'
import { AuthService } from 'src/app/services/auth.service'
import { Usuario } from '../login/usuario'
import { ResponseCreate } from 'src/app/models/users.model';
import { ProdutosService } from 'src/app/services/produtos.service'

declare var paypal

@Component({
  selector: 'app-finalizar-pedido',
  templateUrl: './finalizar-pedido.component.html',
  styleUrls: ['./finalizar-pedido.component.css']
})


export class FinalizarPedidoComponent implements OnInit {

  usuarios: ResponseCreate

  id: number

  total = 0

  registerForm: FormGroup

  public address: Address = {
    address_cep: "",
    address_endereco: "",
    address_numero: "",
    address_complemento: "",
    address_bairro: "",
    address_cidade: "",
    address_estado: "",
    address_telefone: ""
  }

  testeAdd;
  token;
  user: Usuario = {
    email: '',
    senha: ''
  }

  storage = []

  existingCartItems = []

  constructor(private cepService: AddressService,
    private auth: AuthService,
    public formBuilder: FormBuilder,
    private spinnerService: NgxSpinnerService,
    private router: Router,
    private produtosService: ProdutosService) { }

  @ViewChild('paypal', { static: true }) paypalElement: ElementRef

  produto = {
    descricao: 'E-commerce Thoth',
    preco: 425.99,
    img: 'Imagem do produto'
  }

  pay = []

  ngOnInit() {

    this.storage = JSON.parse(localStorage.getItem('complementaryInfo'))
    this.existingCartItems = JSON.parse(localStorage.getItem('products'))

    paypal
      .Buttons({
        style: {
          layout: 'vertical',
          color: 'blue',
          shape: 'rect',
          label: 'paypal'
        },
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: this.produto.descricao,
                amount: {
                  currency_code: 'BRL',
                  value: this.storage['valorTotal']
                }
              }
            ]
          })
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          this.pay = order
          if (this.pay['status'] === 'COMPLETED') {

            var arrr = [
              {
                storage: this.storage,
                user: this.usuario
              }
            ]

            debugger
            this.produtosService.createPedido(arrr).subscribe((data) => {

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

            debugger
            this.produtosService.update(this.existingCartItems[0]).subscribe(() => {
            })

            localStorage.removeItem("products")
            localStorage.removeItem("complementaryInfo")

            this.router.navigate(['/thank-cred']).then(nav => {
              window.location.reload()
            })

            this.produtosService.showMessage('Pagamento Confirmado')
            this.router.navigate(['/thank-cred'])

          } else {
            this.produtosService.showMessage('Falha ao processar pagamento')
            this.router.navigate(['/finalizar-pedido'])
          }
          console.log(order)
        },
        onError: err => {
          console.log(err)
        }
      })
      .render(this.paypalElement.nativeElement)

    this.registerForm = this.formBuilder.group({
      address_cep: ['', Validators.required],
      address_endereco: ['', Validators.required],
      address_numero: ['', Validators.required],
      address_complemento: [''],
      address_bairro: ['', Validators.required],
      address_cidade: ['', Validators.required],
      address_estado: ['', Validators.required]
    })

    this.takeUser()
    this.spinner()
  }


  onLogin() {
    return this.auth.loginUser(this.user.email, this.user.senha).subscribe(data => {
      if (this.user.email === this.user.email && this.user.senha === this.user.senha) {
        this.auth.setUser(data['results'][0])
        this.token = data.token
        this.auth.setToken(this.token)
        this.router.navigate(['/finalizar-pedido']).then(nav => {
          window.location.reload();
        });
      }

    }, error => console.log(error))
  }

  ii
  update() {
    debugger
    var id
    var qtd
    var ids = []
    var qtds = []

    for (let i = 0; i < this.existingCartItems.length; i++) {
      id = this.existingCartItems[i].id
      ids.push(id)

      qtd = this.existingCartItems[i].carrinhoQuantity
      qtds.push(qtd)

    }

    this.ii = [
      {
        id: ids,
        qtd: qtds
      }
    ]

    this.produtosService.update(this.existingCartItems[0]).subscribe(() => {
      this.produtosService.showMessage('Produto criado com sucesso!')
    })
  }




  usuario
  takeUser() {
    this.usuario = this.auth.getCurrentUser()
  }

  spinner(): void {
    this.spinnerService.show()
    setTimeout(() => {
      this.spinnerService.hide()
    }, 2000)
  }

  consultaCEP(cep) {

    // Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '')

    if (cep != null && cep !== '') {
      this.cepService.consultaCEP(cep)
        .subscribe(dados => this.populaDadosForm(dados, this.registerForm))
    }
  }

  populaDadosForm(dados, formulario) {
    formulario.get('address_endereco').setValue(dados.logradouro)
    formulario.get('address_bairro').setValue(dados.bairro)
    formulario.get('address_complemento').setValue(dados.complemento)
    formulario.get('address_cidade').setValue(dados.localidade)
    formulario.get('address_estado').setValue(dados.uf)
  }

  finalizar() {
    debugger
    var arrr = [
      {
        storage: this.storage,
        user: this.usuario
      }
    ]

    debugger
    this.produtosService.createPedido(arrr).subscribe((data) => {

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

      debugger
      this.produtosService.up(this.existingCartItems[0]).subscribe(() => {
      })

    })

    // localStorage.removeItem("products")
    // localStorage.removeItem("complementaryInfo")

    /* this.router.navigate(['/thank-cred']).then(nav => {
      window.location.reload()
    }) */

  }

}

