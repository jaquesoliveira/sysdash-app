import { SelectionModel } from '@angular/cdk/collections';
import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { InfoDialogComponent } from 'src/app/shared/info-dialog/info-dialog.component';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrl: './usuarios-list.component.css'
})
export class UsuariosListComponent {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public dataSource: MatTableDataSource<Usuario>;
  public selection = new SelectionModel<Usuario>;

  public pageOptions: number[] = [5, 10, 15];
  public pageSize = 5;
  public totalPages: number;

  displayedColumns: string[] = ['nome', 'login', 'acoes'];

  login = ""
  tituloConfirmDialog = ''
  usuarioList: Usuario[]  = []
  showSpinner = false;

  constructor(
    private router: Router,
    private service: UsuariosService,
    private dialog: MatDialog,
  ){}

  ngOnInit(){
    this.showSpinnerManager(true);
    this.listar();
    localStorage.removeItem('usarios');
  }

  navegarParaFormularioDeusuario(){
    this.router.navigate(['/usuarios'])
  }

  navegarParaMenuDeClientes(){
    this.router.navigate(['/cadastro/clientes'])
  }

  novoUsuario(){
    this.router.navigate(['/usuarios'])
  }

  listar(){
    this.service.listar().subscribe({
      next: (data) => {
        this.showSpinnerManager(false);
        this.dataSource = new MatTableDataSource<Usuario> (data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.totalPages = data.length;

        this.usuarioList = data
      },
      error: (erro) => {
        console.log(erro.erro)
        this.showSpinnerManager(false);
      }
    })
  }

  editar(mod: Usuario){
    localStorage.setItem('usarios', JSON.stringify(mod));
    this.navegarParaFormularioDeusuario()
  }

  excluir(id: number){
    const dialogRef = this.confirmDialog("Deseja continuar?")
    
    dialogRef.afterClosed().subscribe((data) => {
      if(data){
        this.showSpinnerManager(true);
        this.service.excluir(id).subscribe({
          next: () => {
            const ret = this.infoDialog();
            ret.afterClosed().subscribe((data)=>{
              if(data){
                this.listar();
              }  
            })
          },
          error: (erro) => {
            console.log(erro.erro)
          }
        })
      }
    })
    
  }

  showSpinnerManager(status: boolean){
    this.showSpinner = status
  }

  confirmDialog(msg: string){
    this.tituloConfirmDialog = msg;
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {tituloDialog: this.tituloConfirmDialog};

    return this.dialog.open(ConfirmDialogComponent, dialogConfig);
  }

  infoDialog(){
    this.tituloConfirmDialog = "Operação realizada com sucesso!";
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {tituloDialog: this.tituloConfirmDialog};
    
    this.showSpinnerManager(false);
    return this.dialog.open(InfoDialogComponent, dialogConfig);
  }

  consultar(){}
  cancelar(){}
}
