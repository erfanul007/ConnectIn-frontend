import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthserviceService } from '../services/authservice.service';
import { SharedataService } from '../services/sharedata.service';
import { registeruser } from 'src/models/user/registeruser';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupstatus = '';
  hidePassWord = true;
  hideConfirmPassWord = true;
  genderOptions = ['Male', 'Female'];
  signupform: FormGroup;

  constructor(private authservice: AuthserviceService, private sharedata: SharedataService){
    this.sharedata.getregisterresponose.subscribe(resp => this.signupstatus = resp);
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
    if(this.signupform.valid != true){
      return;
    }
    const newuser: registeruser = {
      fname: this.signupform.value.firstname,
      lname: this.signupform.value.lastname,
      email: this.signupform.value.email,
      username: this.signupform.value.username,
      dateofbirth: this.signupform.value.dateofbirth.toLocaleString(),
      gender: this.signupform.value.gender,
      password: this.signupform.value.password,
      repeatpassword: this.signupform.value.repeatpassword
    }
    this.authservice.register(newuser);
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
