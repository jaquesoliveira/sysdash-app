import { EventEmitter, Injectable } from '@angular/core';
import { enviroment } from '../enviroment/enviroment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { InfoUsuario } from '../models/token.model';
import { Router } from '@angular/router';
import { ExibirMenuService } from './exibir-menu.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = enviroment.baseUrl;

  constructor(private httpClient: HttpClient,
    private route: Router, private mostrar: ExibirMenuService   
  ) { }
  
  logar(usuario:string, senha:string){
    let httpOptions = this.getHeaders(usuario, senha);
    return this.httpClient.get<InfoUsuario>(this.url.concat(`/authenticate`), httpOptions)    
    .pipe(catchError(this.handlerError))
  }

  private getHeaders(usuario:string, senha:string){
    let credentials = btoa(`${usuario}:${senha}`);
    return  {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': `Basic ${credentials}`
      })
    }
  }

  logout(){
    //this.mostrarMenuEmitter.emit(false);
    this.mostrar.exconderMenu();
    localStorage.removeItem('token');
    localStorage.removeItem('nomeUsuario');
    localStorage.removeItem('permissao');
    this.route.navigate(['login'])
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
