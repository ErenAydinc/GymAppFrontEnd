import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    // if(currentUser){
    //   // authorized so return true
    //   return true;
    // }

    
   

   let adminGuardSuccess=false
    if (currentUser) {
      currentUser.userOperationClaims.forEach((userOperationClaim) => {
        if (
          userOperationClaim.operationClaimId == 1 ||
          userOperationClaim.operationClaimId == 2 
        ) {
          console.log(userOperationClaim.operationClaimId);
          adminGuardSuccess=true
        }
      });
    }

    if (adminGuardSuccess) {
      return true;
    }

    console.log('buraya girdi');
    // not logged in so redirect to login page
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
