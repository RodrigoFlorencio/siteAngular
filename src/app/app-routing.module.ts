import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ComprasComponent } from './components/compras/compras.component';
import { ContatoComponent } from './components/contato/contato.component';
import { ProdutosComponent } from './components/produtos/produtos.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { FinalizarPedidoComponent } from './components/finalizar-pedido/finalizar-pedido.component';
import { ThankyouComponent } from './components/thankyou/thankyou.component';
import { AreaClienteComponent } from './components/area-cliente/area-cliente.component';
import { ThankyouCredComponent } from './components/thankyou-cred/thankyou-cred.component';
import { LoginComponent } from './components/login/login.component';
import { AreaDadosComponent } from './components/area-dados/area-dados.component';
import { AreaEnderecosComponent } from './components/area-enderecos/area-enderecos.component';



const routes: Routes = [
  { 
    path: "", 
    component: HomeComponent 
  },

  { 
    path: "produtos", 
    component: ProdutosComponent
  },

  { 
    path: "contato", 
    component: ContatoComponent 
  },

  { 
    path: "produtos", 
    component: ProdutosComponent 
  },

  {
    path: 'compras/:id',
    component: ComprasComponent
  },

  { 
    path: "shop-cart", 
    component: ShoppingCartComponent 
  },
  
  {
    path: "login",
    component: LoginComponent
  },

  {
    path: "finalizar-pedido",
    component: FinalizarPedidoComponent
  },
  
  {
    path: "cadastro",
    component: CadastroComponent
  },

  {
    path: "area-cliente",
    component: AreaClienteComponent
  },

  {
    path: "area-dados",
    component: AreaDadosComponent
  },

  {
    path: "area-enderecos",
    component: AreaEnderecosComponent
  },

  {
    path: "thankyou",
    component: ThankyouComponent
  },

  {
    path: "thank-cred",
    component: ThankyouCredComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
