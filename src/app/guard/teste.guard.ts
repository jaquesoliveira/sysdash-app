import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import {inject} from "@angular/core";

export const testeGuard: CanActivateFn = (route, state) => {
  
  const isauthenticated = inject(LoginService).isAuthenticated()
  const router = inject(Router)
  const roles = route.data['roles'] as string[];

  const userRoles = inject(LoginService).getRoles()

  let temp: any = route.data;
  console.log(">>>>>>>>>> roles " + roles);
  console.log(">>>>>>>>>> roles " + userRoles);
  

  if(!isauthenticated){
    return false
  }

  if(roles.some((role) => userRoles?.includes(role))){
    return true;
  }

  return false;
};
