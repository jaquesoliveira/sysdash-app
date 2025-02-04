import { Injectable } from '@angular/core';
import { enviroment } from '../enviroment/enviroment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private url = enviroment.baseUrl;
  private path = '/api/v1/usuario'

  constructor(private httpClient: HttpClient,
    private route: Router  
  ) { }

  listar(): Observable<any>{
    let httpOptions = this.getHeaders();
        return this.httpClient.get<any>(this.url.concat(this.path), httpOptions)          
        .pipe(catchError(this.handlerError))
  }

  listarRoles(): Observable<Role[]>{
    let httpOptions = this.getHeaders();
        return this.httpClient.get<Role[]>(this.url.concat(this.path + "/roles"), httpOptions)          
        .pipe(catchError(this.handlerError))
  }

  salvar(usuario: Usuario): Observable<Usuario>{
    let httpOptions = this.getHeaders();
        return this.httpClient.post<Usuario>(this.url.concat(this.path),usuario, httpOptions)          
        .pipe(catchError(this.handlerError))
  }

  excluir(id): Observable<any>{
    let httpOptions = this.getHeaders();
        return this.httpClient.delete<any>(this.url.concat(this.path + '/' + id), httpOptions)
        .pipe(catchError(this.handlerError))
  }

  private getHeaders(){
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      })
    }
  }
  
  handlerError(error: HttpErrorResponse){
    let errorMessage = ''

    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message
    } else {
      //errorMessage = "Deu ruim"
      errorMessage = error.error.message
    }
    return throwError(errorMessage);
  }

}
