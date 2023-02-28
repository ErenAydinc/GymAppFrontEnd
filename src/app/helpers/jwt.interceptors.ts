import { Injectable } from '@angular/core';
import { HttpRequest, HttpEvent, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor{
  constructor(private authenticationService: AuthService){}
  intercept(request: HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>>{
    //add authorization header if jwt available
    let currentUser = this.authenticationService.currentUserValue;
    if(currentUser && currentUser.accessToken.token){
      request = request.clone({
        setHeaders:{
          Authorization: `Bearer ${currentUser.accessToken.token}`
        }
      });
    }
    return next.handle(request);
  }
}