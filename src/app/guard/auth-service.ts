import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    // constructor(private http: HttpClient) {}
    constructor() {}

    isLoggedIn: boolean = false;

    // login(userDetails: { username: string; password: string }): Observable<boolean> {
    // return this.http.post<any>('http://examples/api/login', userDetails)
    //     .pipe(
    //         map(response => {
    //             localStorage.setItem('JWT_Token', response.token);
    //             this.isLoggedIn = true;
    //             return true;
    //         }),
    //         catchError(error => {
    //             console.log(error);
    //             this.isLoggedIn = false;
    //             return of(false);
    //         })
    //     );
    // }
    login() {
        this.isLoggedIn = true
      }

    logout(): void {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    }

    isAuthenticated(): boolean {
        return this.isLoggedIn;
    }
}