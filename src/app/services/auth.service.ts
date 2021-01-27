import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario, ResponseUsuario } from '../components/login/usuario';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  urlLogin: 'http://localhost:3002/usuarios/login'

  login: Usuario[]

  constructor(private router: Router,
              private snackBar: MatSnackBar,
              private http: HttpClient) { }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  })

  loginUser(email: string, senha: string): Observable<any> {
    const url_api = `http://localhost:3002/usuarios/login`
    return this.http.post(url_api, { email, senha }, { headers: this.headers })
      .pipe(map(data => data))
  }

  setUser(user): void {
    let user_string = JSON.stringify(user)
    localStorage.setItem("currentUser", user_string)
  }

  setToken(token): void {
    localStorage.setItem("accessToken", token)
  }

  getToken() {
    return localStorage.getItem("accessToken")
  }

  getCurrentUser() {
    let user_string = localStorage.getItem("currentUser")
    if (
      user_string) {
      let user = JSON.parse(user_string)
      return user
    } else {
      return null
    }
  }

  logoutUser() {
    let accessToken = localStorage.getItem('accessToken')
    const url_api = `http://localhost:3002/usuarios/logout?access_token=${accessToken}`
    localStorage.removeItem("accessToken")
    localStorage.removeItem("currentUser")
    localStorage.removeItem("products")
    localStorage.removeItem("complementaryInfo")
    return this.http.post(url_api, { headers: this.headers })
  }

  showMessage(msg: string, isErro: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 4000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isErro ? ['msg-erro'] : ['msg-success']
    })
  }

}
























/* import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { environment } from '../../environments/environment'
import { Usuario, ResponseUsuario } from '../components/login/usuario';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  headers: HttpHeaders = new  HttpHeaders({
    "Content-Type": "application/json"
  })


  loginuser(email: string, senha: string): Observable<any> {
    debugger
    const url_api = `http://localhost:3002/usuarios/login`
    return this.http.post(url_api, { email, senha }, { headers: this.headers })
      .pipe(map(data => data))
  }

  logout(): void {
    localStorage.removeItem('token')
    // set userIsLogged = false
  }

  private checkToken(): void {
    const userToken = localStorage.getItem('token')
    // const isExired =  helper.isTokenExpired(userToken)
    // set userisLogged = isExpired
  }

  private saveToken(token: string): void {
    localStorage.setItem('token', token)
  }

  private handlerError(err): Observable<never> {

    let errorMessage = 'Ocorreu um erro ao recuperar dados'

    if(err) {
      errorMessage = `Error: code ${err.message}`
      this.showMessage('Ocorreu um erro ao recuperar dados')
      return throwError(errorMessage)
    }

  }

  showMessage(msg: string, isErro: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 4000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isErro ? ['msg-erro'] : ['msg-success']
    })
  }

} */












/* login(authData: Usuario): Observable<ResponseUsuario | void> {
    return this.http.post<ResponseUsuario>(
      `${environment.API_URL}/cadastro/login`, authData)
      .pipe(
        map((res: ResponseUsuario) => {
          console.log(authData)
          // saveToken()
        }),
        catchError((err) => this.handlerError(err))
      )
  } */




