import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { serverroot } from '../app.module';
import { userbasic } from 'src/models/user/userbasic';
import { HttpClient } from '@angular/common/http';
import { SharedataService } from './sharedata.service';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private router: Router, private http: HttpClient, private sharedata: SharedataService) { }

  login(username: string, password: string): boolean {
    if(username.includes('hacker') || password.includes('hack')){
      return false;
    }
    const apiurl = serverroot + 'login';
    const data = {
      username: username,
      password: password
    }
    this.http.post<userbasic>(apiurl, data).subscribe({
      next: (response) => {
        this.sharedata.setloggedinUser(response);
        this.router.navigate(['/home']);
      }
    });
    return false;
  }

  logout() {
    this.sharedata.setloggedinUser({} as userbasic);
    this.router.navigate(['/login']);
  }
}
