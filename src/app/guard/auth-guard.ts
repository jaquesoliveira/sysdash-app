import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import {inject} from "@angular/core";
import { ExibirMenuService } from '../services/exibir-menu.service';

export const AuthGuard : CanActivateFn = (route, state) => {
    const roles = route.data['roles'] as string[];  
    const userRoles = inject(LoginService).getRoles()

    let isauthenticated = inject(LoginService).isAuthenticated()
    let router = inject(Router)
    const mostrar = inject(ExibirMenuService)

    if (isauthenticated && roles.some((role) => userRoles?.includes(role))) {        
        mostrar.mostrarMenu();
        rolesGuard(roles, userRoles, mostrar)
        return true;
    } else {
        router.navigate(['/login']);
        return false;
    }    
}

const rolesGuard = (roles, userRoles, mostrar) => {
    if(roles.some(() => userRoles?.includes('ADMIN'))){
        mostrar.ehAdmin()
    }else{
        mostrar.naoEhAdmin()
    }   
}