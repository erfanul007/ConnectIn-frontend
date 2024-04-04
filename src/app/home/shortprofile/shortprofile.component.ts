import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/services/authservice.service';
import { SharedataService } from 'src/app/services/sharedata.service';
import { userbasic } from 'src/models/user/userbasic';

@Component({
  selector: 'app-shortprofile',
  templateUrl: './shortprofile.component.html',
  styleUrls: ['./shortprofile.component.css']
})
export class ShortprofileComponent {
  currentuser = {} as userbasic;
  constructor(private router: Router, private sharedata: SharedataService, private authservice: AuthserviceService){
    this.sharedata.getloggedinuser.subscribe(user => this.currentuser = user);
  }

  logout(){
    this.authservice.logout();
  }

  gotoprofile(){
    this.sharedata.setuser(this.currentuser);
    this.router.navigate(['/profile/' + this.currentuser.username]);
  }
}
