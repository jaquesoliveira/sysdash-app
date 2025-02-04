import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { ExibirMenuService } from './services/exibir-menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'app_acompanhamento';
  nomeUsuario = ""
  mostrarMenu: boolean = true
  isAdmin: boolean = true

   constructor(
      private route: Router,
      private login: LoginService,
      private exibir: ExibirMenuService){}

  getNomeUsuario(){
    this.nomeUsuario = localStorage.getItem('nomeUsuario');    
  }

  sair(){  
    //this.route.navigate(['login'])
    this.login.logout()
  }

  ngOnInit(){

    

    this.exibir.mostrarMenuEmitter.subscribe(
      mostrar => this.mostrarMenu = mostrar
    );

    this.exibir.adminEmitter.subscribe(
      mostrar => this.isAdmin = mostrar
    );

    let role = localStorage.getItem('permissao');
    if(role==='ADMIN'){
      this.isAdmin = true;
    }else{
      this.isAdmin = false;
    }
  }

}
