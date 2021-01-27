import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, CanActivate {

  user: Usuario = {
    email: '',
    senha: ''
  }

  constructor(private authService: AuthService, private router: Router) { }

  token;

  ngOnInit(): void {
  }

  onLogin() {
    return this.authService.loginUser(this.user.email, this.user.senha).subscribe(data => {
      if (this.user.email === this.user.email && this.user.senha === this.user.senha) {
        this.authService.setUser(data['results'][0])
        this.token = data.token
        this.authService.setToken(this.token)
        this.router.navigate(['/']).then(nav => {
          window.location.reload();
        });
      }

    }, error => console.log(error))
  }

  usuario;
  takeUser() {
    this.usuario = this.authService.getCurrentUser();
    return this.usuario == null  ? false : true;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (this.takeUser()) {
      return true
    }
    return false
  }

}
