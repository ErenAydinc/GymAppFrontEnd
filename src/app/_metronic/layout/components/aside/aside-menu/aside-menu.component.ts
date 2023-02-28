import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/loginModel';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.scss'],
})
export class AsideMenuComponent implements OnInit {
  appAngularVersion: string = environment.appVersion;
  appPreviewChangelogUrl: string = environment.appPreviewChangelogUrl;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userOperationClaimControl();
  }
  logOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(["auth/login"])
  }
  localStorageUser: Login;
  isAdmin = false;
  isPersonalTrainer = false;
  userOperationClaimControl() {
    const currentUser = this.authService.currentUserValue;

    currentUser.userOperationClaims.forEach((userOperationClaim) => {
      if (userOperationClaim.operationClaimId == 2) {
        this.isAdmin = true;
      } else if (userOperationClaim.operationClaimId == 3) {
        this.isPersonalTrainer = true;
      } else {
        console.log('Yetkiniz yok');
      }
    });

    this.localStorageUser = currentUser;
  }
}
