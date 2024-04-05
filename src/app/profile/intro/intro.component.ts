import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { serverroot } from 'src/app/app.module';
import { SharedataService } from 'src/app/services/sharedata.service';
import { schooldetails } from 'src/models/user/schooldetails';
import { userbasic } from 'src/models/user/userbasic';
import { userinfo } from 'src/models/user/userinfo';
import { userprofile } from 'src/models/user/userprofile';
import { workdetails } from 'src/models/user/workdetails';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css'],
})
export class IntroComponent {
  userdetails = {} as userinfo;
  user = {} as userbasic;
  @Input() userheader = {} as userprofile;
  constructor(private http: HttpClient, private sharedata: SharedataService) {
    this.sharedata.getuser.subscribe(user =>{
      if(user.username){
        this.user = user;
        this.getuserinfo(user.username);
      }
    });
  }

  getuserinfo(username: string){
    const apiurl = serverroot + 'user-info' + '?username=' + username;
    this.http.get<userinfo>(apiurl).subscribe({
      next: (response) => {
        this.userdetails = response;
      }
    })
  }
}
