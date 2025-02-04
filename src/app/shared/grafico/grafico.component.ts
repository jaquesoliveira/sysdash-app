import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';
import { ComponentDashboard } from 'src/app/models/content-dash.model';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrl: './grafico.component.css'
})
export class GraficoComponent {

  @Input() usuario: string
  @Input() contato: string
  @Input() prospect: string
  @Input() qualificado: string

  canvasName: any
  grafico: any = []
  data: any;
  options: any;

  nome = ""

  constructor( private route: Router){}

  ngOnInit(){
    this.canvasName = Math.random().toString();    
    this.nome = localStorage.getItem('nomeUsuario');
  }

  ngAfterViewInit() {
    this.gerarGrafico()
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
        data: [this.prospect, this.contato, this.qualificado],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    };
  }

  novoAcompanhamento(){
    this.route.navigate(['acompanhamento'])
  }

  getTotal(prospect, contato, qualificado){
    let n1 = parseInt(prospect);
    let n2 = parseInt(contato);
    let n3 = parseInt(qualificado);

    return n1 + n2 + n3
  }

}
