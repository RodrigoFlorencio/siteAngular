import { NgModule, LOCALE_ID } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import localePt from '@angular/common/locales/pt'
import { registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressBarModule } from '@angular/material/progress-bar';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { ComprasComponent } from './components/compras/compras.component';
import { ContatoComponent } from './components/contato/contato.component';
import { FinalizarPedidoComponent } from './components/finalizar-pedido/finalizar-pedido.component';
import { HomeComponent } from './components/home/home.component';
import { ProdutosComponent } from './components/produtos/produtos.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { NavComponent } from './components/template/nav/nav.component';
import { FooterComponent } from './components/template/footer/footer.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ThankyouComponent } from './components/thankyou/thankyou.component';
import { AreaClienteComponent } from './components/area-cliente/area-cliente.component';
import { ThankyouCredComponent } from './components/thankyou-cred/thankyou-cred.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from "./services/auth.service";
import { NgxMaskModule } from 'ngx-mask';
import { AreaEnderecosComponent } from './components/area-enderecos/area-enderecos.component';
import { AreaDadosComponent } from './components/area-dados/area-dados.component';


registerLocaleData(localePt)


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    ContatoComponent,
    ComprasComponent,
    ProdutosComponent,
    FooterComponent,
    ShoppingCartComponent,
    FinalizarPedidoComponent,
    CadastroComponent,
    ThankyouComponent,
    AreaClienteComponent,
    ThankyouCredComponent,
    LoginComponent,
    AreaEnderecosComponent,
    AreaDadosComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    MatSnackBarModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatSliderModule,
    MatProgressBarModule,
    NgxMaskModule.forRoot()
  ],
  
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    },
    AuthService,
    LoginComponent
  ],

  bootstrap: [AppComponent]

})

export class AppModule { }
