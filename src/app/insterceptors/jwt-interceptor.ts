// // // import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

// // // export class JwtInterceptor implements HttpInterceptor {
  
// // //  intercept(req: HttpRequest<any>, next: HttpHandler) {
// // //     const token = localStorage.getItem('token');
// // //     if (token) {
// // //       const authReq = req.clone({
// // //         setHeaders: {
// // //           Authorization: `Bearer ${token}`
// // //         }
// // //       });
// // //       return next.handle(authReq);
// // //     } else {
// // //       return next.handle(req);
// // //     }
// // //   }
// // // }


// import { Injectable } from '@angular/core';
// import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
// import { catchError, Observable, throwError } from 'rxjs';
// import { Router } from '@angular/router';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {

//   //constructor(private authService: AuthService) {}
//   constructor(private router: Router) {}

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const url ='http://192.168.100.34:8080/authenticate'
    
//     if(req.url !== url){
//         // 
//     const authToken = localStorage.getItem('token');

//     // Clonar a requisição original e substituir o cabeçalho de autorização
//     const authReq = req.clone({        
//       headers: req.headers.set('Authorization', `Bearer ${authToken}`)
//     });
//     return next.handle(authReq);   
//     // Enviar a requisição clonada com o cabeçalho de autorização    

//     } 
//     return next.handle(null);   
//   }  
// }