import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class PersonalTrainerGuard implements CanActivate {
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

    
   

   let personalTrainerGuardSuccess=false
    if (currentUser) {
      currentUser.userOperationClaims.forEach((userOperationClaim) => {
        if (
          userOperationClaim.operationClaimId == 3
        ) {
          personalTrainerGuardSuccess=true
        }
      });
    }

    if (personalTrainerGuardSuccess) {
      return true;
    }

    // not logged in so redirect to login page
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
