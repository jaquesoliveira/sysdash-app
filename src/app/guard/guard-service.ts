// import { CanActivateFn, Router } from '@angular/router';
// import { LoginService } from '../services/login.service';
// import {inject} from "@angular/core";

// export const AuthGuardService : CanActivateFn = () => {

//  let isauthenticated = inject(LoginService).isAuthenticated()
//  let router = inject(Router)

//      if (isauthenticated) {
//       return true;
//     } else {
//       router.navigate(['/login']);
//       return false;
//     }
// }