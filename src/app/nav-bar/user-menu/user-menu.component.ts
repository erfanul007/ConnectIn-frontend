import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { SharedataService } from 'src/app/services/sharedata.service';
import { userbasic } from 'src/models/user/userbasic';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css'],
})
export class UserMenuComponent {
  currentuser = {} as userbasic;
  constructor(private router: Router, private authservice: AuthserviceService, private sharedata: SharedataService){
    this.sharedata.getloggedinuser.subscribe((user)=>{
      this.currentuser = user;
    });
  }

  logout(){
    this.authservice.logout();
  }

  gotoprofile(){
    this.sharedata.setuser(this.currentuser);
    this.router.navigate(['/profile/' + this.currentuser.username]);
  }
}
