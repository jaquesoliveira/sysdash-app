// import { HttpClient } from '@angular/common/http';
// import { catchError, map, Observable, of } from 'rxjs';

// export class AuthService {
//   constructor(private http: HttpClient) {}

//   isLoggedIn: boolean = false;

//   login(userDetails: { username: string; password: string }): Observable<boolean> {
//     return this.http.post<any>('http://examples/api/login', userDetails)
//       .pipe(
//         map(response => {
//           localStorage.setItem('JWT_Token', response.token);
//           this.isLoggedIn = true;
//           return true;
//         }),
//         catchError(error => {
//           console.log(error);
//           this.isLoggedIn = false;
//           return of(false);
//         })
//       );
//   }

//   logout(): void {
//     localStorage.removeItem('token');
//     this.isLoggedIn = false;
//   }

//   isAuthenticated(): boolean {
//     return this.isLoggedIn;
//   }
// }