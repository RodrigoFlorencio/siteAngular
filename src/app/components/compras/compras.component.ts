import { CartService } from './../../services/cart.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Produtos } from '../../models/produtos.model';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProdutosService } from 'src/app/services/produtos.service';
import { CartModelServer } from 'src/app/models/cart.model';
import { Frete } from 'src/app/models/address.model';

declare let $: any

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})

export class ComprasComponent implements OnInit {

  produtos: Produtos[]
  produto: Produtos

  cartData: CartModelServer

  id: number
  thumbImagem: any[] = []

  public frete: Frete = {
    frete_sCepOrigem:  "",
    frete_sCepDestino:  "",
    frete_nVlPeso:  "",
    frete_nCdFormato:  "",
    frete_nVlComprimento:  "",
    frete_nVlAltura:  "",
    frete_nVlLargura:  "",
    frete_nCdServico:  "",
    frete_nVlDiametro:  ""
  }

  constructor(private produtosService: ProdutosService,
              private route: ActivatedRoute,
              private router: Router,
              private cartService: CartService) { }

  ngOnInit(): void {
    this.produtosService.getProducts().subscribe((data) => {
        this.produtos = data['produtos']
      }, (error) => {
        console.log(error)
      }
    )

    this.route.paramMap.pipe(map((param: ParamMap) => {
        // @ts-ignore
        return param.params.id})).subscribe(prodId => {
      this.id = prodId
      this.produtosService.getProdutoOne(this.id).subscribe(prod => {
        this.produto = prod["produto"]
        if (this.produto.imagem !== "") {
          this.thumbImagem = this.produto.imagem.split(';')
        }
      })
    })
  }

  addToCart(produto) {
		this.cartService.addToCart(produto)
		this.router.navigate(['/shop-cart']).then(nav => {
			window.location.reload();
		});
	}

}
