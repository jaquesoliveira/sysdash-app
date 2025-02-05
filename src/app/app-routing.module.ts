import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AcompanhamentoComponent } from './pages/acompanhamento/acompanhamento.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { UsuariosListComponent } from './pages/usuarios-list/usuarios-list.component';
import { LoginService } from './services/login.service';
import { AuthService } from './guard/auth-service';
import { AuthGuard } from './guard/auth-guard';
import { testeGuard } from './guard/teste.guard';

const routes: Routes = [
  {
    path:'',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path:'login',
    component: LoginComponent,    
  },
  {
    path:'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ADMIN', 'USER']
    }       
  },
  {
    path:'acompanhamento',
    component: AcompanhamentoComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ADMIN', 'USER']
    } 
  },
  {
    path:'usuarios',
    component: UsuariosComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ADMIN']
    } 
  },
  {
    path:'usuarios-list',
    component: UsuariosListComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ADMIN']
    } 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
