import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { serverroot } from '../app.module';
import { userbasic } from 'src/models/user/userbasic';
import { HttpClient } from '@angular/common/http';
import { SharedataService } from './sharedata.service';
import { registeruser } from 'src/models/user/registeruser';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  newuser = {} as registeruser;
  constructor(private router: Router, private http: HttpClient, private sharedata: SharedataService) {
    this.sharedata.getnewuser.subscribe(user => this.newuser = user);
  }

  login(username: string, password: string) {
    // to check wrong login force error
    if(username.includes('hacker') || password.includes('hack')){
      this.sharedata.setloginresponse('error');
      return;
    }
    // to login after register as no server there to store data
    if(this.newuser.username && this.newuser.username === username && this.newuser.password === password){
      const loggedinuser = {} as userbasic;
      loggedinuser.username = this.newuser.username;
      loggedinuser.fname = this.newuser.fname;
      loggedinuser.lname = this.newuser.lname;
      this.sharedata.setloggedinuser(loggedinuser);
      this.sharedata.setloginresponse('success');
      this.router.navigate(['/home']);
      return;
    }

    //server logics
    const apiurl = serverroot + 'login';
    const data = {
      username: username,
      password: password
    }
    this.http.post<userbasic>(apiurl, data).subscribe({
      next: (response) => {
        this.sharedata.setloggedinuser(response);
        this.sharedata.setloginresponse('');
        this.sharedata.setregisterresponse('');
        this.router.navigate(['/home']);
      },
      error: (response) => {
        this.sharedata.setloginresponse('error');
      }
    });
    return true;
  }

  logout() {
    this.sharedata.setloggedinuser({} as userbasic);
    this.sharedata.setuser({} as userbasic);
    this.router.navigate(['/login']);
  }

  register(newuser: registeruser){
    if(newuser.username.includes('hacker') || newuser.password.includes('hack')){
      this.sharedata.setregisterresponse('error');
      return;
    }
    const apiurl = serverroot + 'signup';
    this.http.post(apiurl, newuser).subscribe({
      next: () => {
        this.sharedata.setnewuser(newuser);
        this.sharedata.setregisterresponse('success');
        this.sharedata.setloginresponse('');
        this.router.navigate(['/login']);
      },
      error: (response) => {
        this.sharedata.setregisterresponse('error');
      }
    });
  }
}
