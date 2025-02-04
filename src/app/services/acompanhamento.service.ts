import { Injectable } from '@angular/core';
import { enviroment } from '../enviroment/enviroment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { TipoAcompanhamento } from '../models/tipo.model';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcompanhamentoService {

  private url = enviroment.baseUrl;

  httpOptions =  {
    headers: new HttpHeaders({'Content-Type': 'application/json;charset=UTF-8' })
  }

  constructor(private httpClient: HttpClient) { }
  
  salvar(tipo: TipoAcompanhamento): Observable<any>{
    let httpOptions = this.getHeaders();
      return this.httpClient.post<any>(this.url.concat('/api/v1/acompanhamento'), tipo, httpOptions)          
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
