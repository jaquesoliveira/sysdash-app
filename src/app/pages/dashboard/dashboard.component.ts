import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',  
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, AfterViewInit {

  canvasName: any
  grafico: any = []
  data: any;
  options: any;
  
  canvasName2: any
  grafico2: any = []
  data2: any;
  options2: any;

  constructor( private route: Router){}
  
  ngOnInit(){
    this.canvasName = Math.random().toString();
    this.canvasName2 = Math.random().toString();

    console.log(localStorage.getItem('nomeUsuario'));
    console.log(localStorage.getItem('token'));
  }

  ngAfterViewInit() {
    this.gerarGrafico()
    this.gerarGrafico2()
  }
  logar(){
    
  }
  
  novoRegistro(){
    this.route.navigate(['cadastro'])
  }

  gerarGrafico(){

    this.gerarOptions();

    if(this.grafico instanceof Chart){
        this.grafico.destroy();
        this.grafico = []
    }

    this.grafico = new Chart(this.canvasName, {
        type: 'doughnut',
        data: this.data,
        options: this.options
    })
  }

  public gerarOptions(){
    this.data = {
      labels: [
        'Prospect',
        'Contato',
        'Qualificado'
      ],
      datasets: [{
        label: 'Total',
        data: [5, 20, 8],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    };
  }

  gerarGrafico2(){

    this.gerarOptions2();

    if(this.grafico2 instanceof Chart){
        this.grafico2.destroy();
        this.grafico2 = []
    }

    this.grafico2 = new Chart(this.canvasName2, {
        type: 'doughnut',
        data: this.data2,
        options: this.options2
    })
  }

  public gerarOptions2(){
    this.data2 = {
      labels: [
        'Prospect',
        'Contato',
        'Qualificado'
      ],
      datasets: [{
        label: 'Total',
        data: [15, 20, 8],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    };
  }
}
