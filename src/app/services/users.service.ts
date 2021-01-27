import { HttpClient  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RequestCreate, ResponseCreate } from '../models/users.model';
import { AddressService } from './address.service';


@Injectable({
  providedIn: 'root'
})


export class UsersService {

  url = 'http://localhost:3002/usuarios/cadastro'

  urlUser = 'http://localhost:3002/get-user'

  user: ResponseCreate

  constructor(private http: HttpClient,
              private addressService: AddressService) { }

  public getUser(id: number): Observable<ResponseCreate> {
    debugger
    return this.http.get<ResponseCreate>(this.urlUser + 'get-user/' + id)
  }

  readById(id: number): Observable<ResponseCreate> {
    const url = `${this.urlUser}/${id}`
    return this.http.get<ResponseCreate>(url).pipe(
      map((obj) => obj)
    )
  }

  createUser(request: RequestCreate): Observable<ResponseCreate> {
    return this.http.post<ResponseCreate>(this.url, request)
  }

}
