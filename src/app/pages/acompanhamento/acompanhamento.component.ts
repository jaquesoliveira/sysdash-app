import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TipoAcompanhamento } from 'src/app/models/tipo.model';
import { AcompanhamentoService } from 'src/app/services/acompanhamento.service';
import { InfoDialogComponent } from 'src/app/shared/info-dialog/info-dialog.component';

@Component({
  selector: 'app-acompanhamento',
  templateUrl: './acompanhamento.component.html',
  styleUrls: ['./acompanhamento.component.css']
})
export class AcompanhamentoComponent implements OnInit{

  tipos = ['PROSPECT', 'CONTATO', 'QUALIFICADO']
  tipo = {} as TipoAcompanhamento

  tituloConfirmDialog = ''
  showSpinner = false;

  constructor(private route: Router,
    private service: AcompanhamentoService,
    private dialog: MatDialog,
  ){}

  nome = ''
  tipoSelecionado = ''

  ngOnInit(): void {
    this.nome = localStorage.getItem('nomeUsuario');
  }

  cancelar(){
    this.route.navigate(['home'])
  }

  salvar(){
    //
    this.tipo.tipo = this.tipoSelecionado

    //
    this.service.salvar(this.tipo).subscribe({
        next: (data) => {
          const ret = this.infoDialog();
            ret.afterClosed().subscribe((data)=>{
              this.route.navigate(['home'])
            })            
        },
        error: (error) => {
          
        }
    })
  }

  infoDialog(){
    this.tituloConfirmDialog = "Operação realizada com sucesso!";
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {tituloDialog: this.tituloConfirmDialog};
    
    this.showSpinner = false;
    return this.dialog.open(InfoDialogComponent, dialogConfig);
  }
}
