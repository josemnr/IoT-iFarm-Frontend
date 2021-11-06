import { FormGroup } from '@angular/forms';

export class MyValidators {
  static passwordMatchValidator(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors.passwordMismatch
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
          return true;
      } else {
        confirmPasswordControl.setErrors(null);
          return null;
      }
    };
  }

  static emptyForm(name: string, email: string, password: string) {
    return (formGroup: FormGroup) => {
      const nameControl = formGroup.controls[name];
      const emailControl = formGroup.controls[email];
      const passwordControl = formGroup.controls[password];
      if (!nameControl || !emailControl || !passwordControl) {
        return null;
      }

      if (
        nameControl.errors &&
        !nameControl.errors.emptyForm &&
        emailControl.errors &&
        !emailControl.errors.emptyForm &&
        passwordControl.errors &&
        !passwordControl.errors.emptyForm
      ) {
        return null;
      }

      if (nameControl.value == "" && emailControl.value == "" && passwordControl.value == "") {
        nameControl.setErrors({ emptyForm: true });
        emailControl.setErrors({ emptyForm: true });
        passwordControl.setErrors({ emptyForm: true });
        return true;
      } else {
        nameControl.setErrors(null);
        if(!emailControl.hasError('email')) {
          emailControl.setErrors(null);
        }
        passwordControl.setErrors(null);
        return null;
      }
    }
  }

  static placeholderMatch(confirmation: string, placeholder: string) {
    return (formGroup: FormGroup) => {
      const confirmationControl = formGroup.controls[confirmation];
      if (!confirmationControl) {
        return null;
      }

      if (
        confirmationControl.errors &&
        !confirmationControl.errors.placeholderMismatch
      ) {
        return null;
      }

      if (confirmationControl.value != placeholder) {
        confirmationControl.setErrors({ placeholderMismatch: true });
        return true;
      } else {
        confirmationControl.setErrors(null);
        return null;
      }
    }
  }
}

