import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProdutosService } from 'src/app/services/produtos.service';
import { Produtos } from 'src/app/models/produtos.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  produtos: Produtos[]

  constructor(private router: Router,
              private produtosService: ProdutosService,
              private cartService: CartService) { }

  ngOnInit(): void {
    this.load();
    this.getProducts()
  }

  getProducts() {
    this.produtosService.getProducts().subscribe(
      (data) => {
        this.produtos = data['produtos']
      },
      (error) => {
        console.log(error)
      }
    )
  }

  addTocart(prod) {
		this.cartService.addToCart(prod)
		this.router.navigate(['/']).then(nav => {
			window.location.reload();
		});
	}

  goToPage(): void {
    this.router.navigate(['/']).then(nav => {
      window.location.reload();
    });

  }

  load() {
    const HAS_RELOAD = 'HAS_RELOAD';  // Ao invés de passar a string 'hasRealod' diretamente é melhor criar uma constante para evitar erros de digitação
    const hasReload = sessionStorage.getItem(HAS_RELOAD);
    if (!hasReload) {
      sessionStorage.setItem(HAS_RELOAD, 'true');
      location.reload();
    }
  }

}
