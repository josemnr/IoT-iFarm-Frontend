import { 
  FormGroup, 
  Validators,
  FormBuilder 
} from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { MyValidators } from './../../../../utils/validators';

import { SessionService } from './../../../../core/services/session/session.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  user: any = {
    email: "",
    name: "",
    password: "",
    role: "supervisor",
    greenhouses_id: []
  };

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private sessionService: SessionService,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  signUpUser(event: Event) {
    event.preventDefault();
    if (this.registerForm.valid) {
      this.user.name = this.registerForm.value.name;
      this.user.email = this.registerForm.value.email;
      this.user.password = this.registerForm.value.password;
      this.sessionService.signup(this.user);
    }
    this.router.navigate(['/login']);
  }

  private buildForm() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: MyValidators.passwordMatchValidator('password', 'confirmPassword') });
  }

  getErrorMessage(formControl: string){
    if(this.registerForm.controls[formControl].hasError('required')){
      return 'You must enter a value';
    }
    if(this.registerForm.controls[formControl].hasError('email')) {
      return 'Not a valid email';
    }
    if(this.registerForm.controls[formControl].hasError('passwordMismatch')) {
      return 'Password mismatch';
    }
    return '';
  }

  hideOrUnhidePassword(event: Event, inputToHide:string) {
    event.preventDefault();
    if(inputToHide == 'hidePassword') {
      this.hidePassword = !this.hidePassword;
    }
    if(inputToHide == 'hideConfirmPassword') {
      this.hideConfirmPassword = !this.hideConfirmPassword;
    }
  }

}
