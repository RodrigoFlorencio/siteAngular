import { CartService } from './../../../services/cart.service';
import { CartModelServer } from './../../../models/cart.model';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from '../../login/usuario';
import { Router } from '@angular/router';
import { Item } from 'src/app/models/produtos.model';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})


export class NavComponent implements OnInit {

  total = 0

  items = this.cartService.items$

  usuarios: Usuario[]

  existingCartItems = 0

  constructor(private router: Router,
              private cartService: CartService,
              private authService: AuthService) { }

  ngOnInit() {
    this.existingCartItems = JSON.parse(localStorage.getItem('products'));
    this.load();
    this.takeUser()
    this.items = this.items['source']['value']['products'] == undefined ?  this.items['source']['value']: this.items['source']['value']['products'];
    this.total = this.items['length']
  }

  usuario;
  takeUser() {
    this.usuario = this.authService.getCurrentUser();
  }

  logout() {
    this.authService.logoutUser()
    this.router.navigate(['/']).then(nav => {
      window.location.reload();
    });
  }

  card() {
    this.router.navigate(['/shop-cart']).then(nav => {
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
