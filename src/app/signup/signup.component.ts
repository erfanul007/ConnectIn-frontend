import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupError = false;
  hidePassWord = true;
  hideConfirmPassWord = true;
  genderOptions = ['Male', 'Female'];
  signupform: FormGroup;

  constructor(){
    this.signupform = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      dateofbirth: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      repeatpassword: new FormControl('', [Validators.required, this.matchPassword()]),
    },
    {
      validators: this.matchPassword
    });
  }

  onSubmit(){
    console.log(this.signupform.value);
    if(this.signupform.valid != true){
      return;
    }
    const firstname = this.signupform.value.firstname;
    const lastname = this.signupform.value.lastname;
    const email = this.signupform.value.email;
    const username = this.signupform.value.username;
    const dateofbirth = this.signupform.value.dateofbirth;
    const gender = this.signupform.value.gender;
    const password = this.signupform.value.password;
  }

  matchPassword(): ValidatorFn{
    return (control: AbstractControl): { [key: string]: any } | null => {
      const formGroup = control.parent;
      if(!formGroup){
        return null;
      }
      const passwordControl = formGroup.get('password');
      if(control.value != passwordControl?.value){
        control.setErrors({mismatch: true})
        return { mismatch: true};
      }
      return null;
    }
  }

}
