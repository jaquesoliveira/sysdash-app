
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfoUsuario } from 'src/app/models/token.model';
import { ExibirMenuService } from 'src/app/services/exibir-menu.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit{
  showSpinner = false;
  infoUsuario = {} as InfoUsuario

  usuario = ""
  senha = ""

  constructor(
    private route: Router,
    private service: LoginService,
    private mostrar: ExibirMenuService ){}

  ngOnInit(){ 
    this.mostrar.exconderMenu()    
  }

  ngAfterViewInit(): void {
    
  }

  logar(){
    this.service.logar(this.usuario, this.senha).subscribe({
      next: (data) => {                
        localStorage.setItem('token', data.token);
        localStorage.setItem('nomeUsuario', data.userName);
        localStorage.setItem('permissao', data.role);
        this.mostrar.mostrarMenu();

        if(data.role === 'ADMIN'){
          this.mostrar.ehAdmin()
        }else{
          this.mostrar.naoEhAdmin()
        }
        
        this.route.navigate(['home'])
      },
      error: (erro) => {
        console.log(erro)
      }
    })
    
  }

  logout(){
    this.service.logout()
  }
}
