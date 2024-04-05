import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { serverroot } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { userbasic } from 'src/models/user/userbasic';
import { SharedataService } from '../services/sharedata.service';
import { Router } from '@angular/router';
import { AuthserviceService } from '../services/authservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginform: FormGroup;
  hidePassWord = true;
  loginstatus = '';
  signupstatus = '';
  constructor(private sharedata: SharedataService, private authservice: AuthserviceService) {
    this.sharedata.getloginresponse.subscribe(resp => this.loginstatus = resp);
    this.sharedata.getregisterresponose.subscribe(resp => this.signupstatus = resp);
    this.loginform = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit(){
    if(this.loginform.valid != true){
      return;
    }
    this.authservice.login(this.loginform.value.username, this.loginform.value.password)
  }
}
