import { Component } from '@angular/core';
import { userbasic } from 'src/models/user/userbasic';
import { userprofile } from 'src/models/user/userprofile';
import { SharedataService } from '../services/sharedata.service';
import { HttpClient } from '@angular/common/http';
import { serverroot } from '../app.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user = {} as userbasic;
  userheader = {} as userprofile;
  isloggedin = true;
  loggedinuser = {} as userbasic;
  constructor(private http: HttpClient, private sharedata: SharedataService, private router: Router){
    this.sharedata.getloggedinuser.subscribe(user => this.loggedinuser = user);
    this.sharedata.getuser.subscribe(user =>{
      if(user.username){
        this.user = user;
      }
      else{
        const username:string = this.router.url.split('/')[2];
        console.log(username);
        this.getnewuserprofile(username);
      }
    });
    this.getuserinfo();
  }

  getuserinfo(){
    const apiurl = serverroot + 'user-header' + '?username=' + this.user.username;
    this.http.get<userprofile>(apiurl).subscribe({
      next: (response) => {
        this.userheader = response;
      }
    })
  }

  addfollow(){
    this.userheader.isfollowing = true;
    this.userheader.followers = this.userheader.followers + 1;
  }

  removefollow(){
    this.userheader.isfollowing = false;
    this.userheader.followers = this.userheader.followers - 1;
  }

  getnewuserprofile(username: string){
    const apiurl = serverroot + 'profile/' + '?username=' + username;
    this.http.get<userbasic>(apiurl).subscribe({
      next: (response) => {
        this.sharedata.setuser(response);
      }
    });
  }
}
