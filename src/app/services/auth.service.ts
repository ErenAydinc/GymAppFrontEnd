import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Login } from '../models/loginModel';
import { User } from '../models/user';
import { API_URL } from './global';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<Login>;
  public currentUser: Observable<Login>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Login>(
      JSON.parse(localStorage.getItem('currentUser')!)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Login {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http
      .post<Login>(API_URL + 'auth/login', { email, password })
      .pipe(
        map((user) => {
          let access = false;
          user.userOperationClaims.forEach((userOperationClaim) => {
            if (userOperationClaim.operationClaimId == 1 || 2 || 3) {
              access = true;
            }
          });
          if (access) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
          // store user details jwt token in localStorage

          return user;
        })
      );
  }

  logout() {
    //remove user from localStorage
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null!);
  }
}
