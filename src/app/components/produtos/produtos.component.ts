import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Item, Produtos } from '../../models/produtos.model'
import { CartService } from './../../services/cart.service'
import { ProdutosService } from 'src/app/services/produtos.service'


@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})


export class ProdutosComponent implements OnInit {
  
	produtos: Produtos[]
	  
	items$ = this.cartService.items$

  	constructor(private router: Router, 
              private produtosService: ProdutosService, 
              private route: ActivatedRoute,
              private cartService: CartService) { }

	ngOnInit(): void { 
		this.produtosService.getProducts().subscribe((data) => {
			this.produtos = data['produtos']
		}, (error) => {console.log(error)}
		)
	}

	/* addToCart(id: number) {
		this.cartService.addCart(id)
	} */

	addToCart(prod) {
		this.cartService.addToCart(prod)
		this.router.navigate(['/produtos']).then(nav => {
			window.location.reload();
		});
	}

	selectProduct(id: number) {
		this.router.navigate(['/compras', id]).then()
	}

	/* AddToCart(id: number) {
		this.cartService.AddProdutoCart(id)
	} */
  
}
