import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AcompanhamentoComponent } from './pages/acompanhamento/acompanhamento.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { UsuariosListComponent } from './pages/usuarios-list/usuarios-list.component';

const routes: Routes = [
  {
    path:'',
    component: LoginComponent,
    //canActivate: [LoginService],
    pathMatch: 'full'
  },
  {
    path:'login',
    component: LoginComponent,
    //canActivate: [LoginService]
  },
  {
    path:'home',
    component: HomeComponent,
    //canActivate: [LoginService]
  },
  {
    path:'acompanhamento',
    component: AcompanhamentoComponent,
  },
  {
    path:'usuarios',
    component: UsuariosComponent,
    //canActivate: [LoginService]
  },
  {
    path:'usuarios-list',
    component: UsuariosListComponent,
    //canActivate: [LoginService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
