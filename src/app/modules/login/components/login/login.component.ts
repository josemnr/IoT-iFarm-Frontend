import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from './../../../../core/services/auth/auth.service';
import { SessionService } from './../../../../core/services/session/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loginError: boolean = true;
  hidePassword: boolean = true;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private sessionService: SessionService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  login(event: Event) {
    event.preventDefault();
    if (this.loginForm.valid) {
      this.sessionService.signin(this.loginForm.value.email, this.loginForm.value.password)
      .then(response => {
        this.authService.saveToken(response.token);
        this.authService.saveUserId(response.user.id);
        this.router.navigate(['/home']);
      }).catch(err => {
        console.log('No se pudo iniciar sesión');
      });
    }
  }

  private buildForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  getErrorMessage(formControl: string){
    if(this.loginForm.controls[formControl].hasError('required')){
      return 'You must enter a value';
    }
    if(this.loginForm.controls[formControl].hasError('email')) {
      return 'Not a valid email';
    }
    return '';
  }

  hideOrUnhidePassword(event: Event) {
    event.preventDefault();
    this.hidePassword = !this.hidePassword;
  }
}
