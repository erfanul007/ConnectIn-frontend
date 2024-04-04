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
  user = {} as userbasic;
  constructor(private router: Router, private authservice: AuthserviceService, private sharedata: SharedataService){
    this.sharedata.getloggedinuser.subscribe((user)=>{
      this.user = user;
    });
  }

  logout(){
    this.authservice.logout();
  }

  gotoprofile(){
    this.sharedata.setuser(this.user);
    this.router.navigate(['/profile/' + this.user.username]);
  }
}
