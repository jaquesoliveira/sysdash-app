import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/role.model';
import { UsuarioSalvar } from 'src/app/models/usuario-salvar.model';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ErrorDialogComponent } from 'src/app/shared/error-dialog/error-dialog.component';
import { InfoDialogComponent } from 'src/app/shared/info-dialog/info-dialog.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit{
  
  showSpinner = false;
  usuarioSalvar = {} as Usuario

  id = null
  nome = ""
  login = ""
  senha = ""
  
  roleSelecionada = {} as Role
  roles: Role[];

  tituloConfirmDialog = ''

  constructor(
    private route: Router,
    private service: UsuariosService,
  private dialog: MatDialog){}

  ngOnInit(): void {
    this.getRoles();

    let usuario: Usuario = JSON.parse(localStorage.getItem('usarios'));  
    if(usuario){
      this.id = usuario.id
      this.nome = usuario.nome
      this.login = usuario.username
      this.senha = usuario.nome
      this.roles = usuario.roles
      if(usuario.id){
        this.roleSelecionada = usuario.roles[0]
      }
    }
  }

  salvar(){
    //this.showSpinnerManager(true);
    this.usuarioSalvar.id = this.id
    this.usuarioSalvar.nome = this.nome
    this.usuarioSalvar.username = this.login
    this.usuarioSalvar.password = this.senha
    this.usuarioSalvar.roles = []
    this.usuarioSalvar.roles.push(this.roleSelecionada)
    
    
    if(this.usuarioSalvar.nome === '' ||
      this.usuarioSalvar.username === '' ||
      this.usuarioSalvar.password === '' ){
        const ret = this.errorDialog("Todos os campos são obrigatórios");
        ret.afterClosed().subscribe((data)=>{
            this.showSpinnerManager(false);              
        })
      }else{
        this.service.salvar(this.usuarioSalvar).subscribe({
          next: (data) => {  
            const ret = this.infoDialog();
            ret.afterClosed().subscribe((data)=>{
              if(data){
                this.route.navigate(['/usuarios-list'])
                this.showSpinnerManager(false);
              }  
            })
              
          },
          error: (erro) => {
            console.log(erro);

            const ret = this.errorDialog(erro.erro);
            ret.afterClosed().subscribe((data)=>{
                this.showSpinnerManager(false);              
            })
          }
        })
      }    
  }

  cancelar(){
    this.route.navigate(['usuarios-list'])
  }

  getRoles(){
    this.service.listarRoles().subscribe({
      next: (data) => {        
        this.roles = data;
      },
      error: (erro) => {
        console.log(erro);        
      }
    })
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

  errorDialog(msg: string){
    this.tituloConfirmDialog = msg;
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {tituloDialog: this.tituloConfirmDialog};
    
    this.showSpinnerManager(false);
    return this.dialog.open(ErrorDialogComponent, dialogConfig);
  }

  showSpinnerManager(status: boolean){
    this.showSpinner = status
  }
}
