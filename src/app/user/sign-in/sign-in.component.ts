import { Login } from './../../shared/login.model';
import { Component, OnInit, Directive, ElementRef, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { NgToastService } from 'ng-angular-popup';
import { NotificationService } from 'src/app/notification.service';
// import { NotificationService } from './notification.service'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

// @Directive({
//   selector: '[appMarkAsterisk]'
// })

export class SignInComponent implements OnInit {

  title = 'toaster-not';
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private toast: NgToastService,
    private notifyService: NotificationService
  ) { }


  loginForm: FormGroup;

  ngOnInit() {
    this.createLoginForm();
  }

  get f() {
    return this.loginForm.controls;
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    debugger
    if (this.loginForm.valid) {
      const body: Login = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }
      this.createLoginForm();
      this.userService.LoginUser(body)
        .subscribe((data: any) => {
          debugger;
          if (data.Status == "success") {
            //this.toast.success;
            this.notifyService.showSuccess('Login Successful');
            //  this.showToasterSuccess();s
            // localStorage.setItem('dataSource', data.Data);
            localStorage.setItem('userDetail', JSON.stringify(data.Data));
            this.router.navigate(['/home']);
          }
          if (data.Status == "fail") {
            this.notifyService.showError(data.Message);
          }
          if (data.Status == "empty") {
             this.notifyService.showWarning(data.Message);
          }
        })
    }
  }
}
