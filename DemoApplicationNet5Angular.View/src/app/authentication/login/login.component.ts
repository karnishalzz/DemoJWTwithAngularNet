import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../_services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  LoginForm: FormGroup;
  submitted = false;
  returnUrl: string = "";
  @BlockUI() blockUI: any;
  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.LoginForm = this.formBuilder.group({
      Email: ['', [Validators.required]],
      Password: ['', [Validators.required]],
    });

    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
      return;
    }
  }

  ngOnInit() {

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  
  get f() {
    return this.LoginForm.controls;
  }


  onLoginSubmit() {
    this.submitted = true;
    if (this.LoginForm.invalid) {
        return;
    }
    this.blockUI.start('Signing in...');

    this.authService.login({ UserName: this.LoginForm.value.Email, Password: this.LoginForm.value.Password }).subscribe(
        data => {
            this.blockUI.stop();
            if (data) {
                this.toastr.success('Successfully logged in', 'Success!', { timeOut: 2000 });
                if (this.returnUrl === '/')
                    this.router.navigate(['/dashboard']);
                else
                    this.router.navigate([this.returnUrl]);
            }
        },
        error => {
            this.blockUI.stop();
            if (error.status === 400) {
                this.toastr.error('Unauthorized request found', 'Success!', { timeOut: 3000 });
            } else if (error.status === 401) {
                this.toastr.error('Invalid Username Or Password', 'Success!', { timeOut: 3000 });
            }
        }
    );
}


}
