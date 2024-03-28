import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginform: FormGroup;
  hidePassWord = true;
  loginError = false;
  constructor() {
    this.loginform = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit(){
    console.log(this.loginform.value);
    if(this.loginform.valid != true){
      return;
    }
    const username = this.loginform.value.username;
    const password = this.loginform.value.password;

    // complete service logics
    this.loginError = true; // if failed

    console.log('Username:', username);
    console.log('Password:', password);
  }
}
