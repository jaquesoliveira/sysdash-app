import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExibirMenuService {

  mostrarMenuEmitter = new EventEmitter<boolean>();
  adminEmitter = new EventEmitter<boolean>();

  constructor() { }

  mostrarMenu(){
    this.mostrarMenuEmitter.emit(true);
  }

  exconderMenu(){
    this.mostrarMenuEmitter.emit(false);
  }

  ehAdmin(){
    this.adminEmitter.emit(true);
  }

  naoEhAdmin(){
    this.adminEmitter.emit(false);
  }
}
