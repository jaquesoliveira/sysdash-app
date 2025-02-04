import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  canvasName: any
  grafico: any = []
  data: any;
  options: any;
  
  canvasName2: any
  grafico2: any = []
  data2: any;
  options2: any;

  cards: any = []
  verTodos = true;

  usuario = ""


  constructor( private route: Router,
      private service: HomeService
  ){}

  ngOnInit(){
    this.service.findAll().subscribe({
      next: (data) => {  
        console.log(data);
        this.cards = data
        
      },
      error: (erro) => {
        console.log(erro.erro);        
      }
    })

    this.usuario = localStorage.getItem('nomeUsuario');
  }

  getCanvasName(){
    return Math.random().toString()
  }    
  
  novoRegistro(){
    this.route.navigate(['cadastro'])
  }

  soEu(){
    if(this.verTodos){
      this.verTodos = false
    }
    else{
      this.verTodos = true
    }
  }
}
