import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  // selector: 'app-login',
  templateUrl: 'login.component.html',
  // styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
    private alertService: AlertService,
    private toast: ToastrService
  ) {
    // if (this.authenticationService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit() {
    console.log(localStorage.getItem('currentUser'));
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    //get return url from router
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;

    // reset alerts on submitted
    this.alertService.clear();

    //stop if form invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService
      .login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        (data) => {
          console.log(this.f.email.value, this.f.password.value);
          console.log(data.userOperationClaims);
          if (data.userOperationClaims.length <= 0) {
            this.toast.error('Yetkiniz yok');
          } else {
            this.toast.success('Giriş Yapılıyor');
            this.router.navigate([this.returnUrl]);
          }
        },
        (error) => {
          this.toast.error("Bilgilerinizi Kontrol Ediniz")
          this.loading = false;
        }
      );
  }
}
