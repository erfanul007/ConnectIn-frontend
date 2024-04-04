import { Component } from '@angular/core';
import { userbasic } from 'src/models/user/userbasic';
import { userprofile } from 'src/models/user/userprofile';
import { SharedataService } from '../services/sharedata.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user = {} as userbasic;
  userheader = {} as userprofile;
  constructor(private sharedata: SharedataService){
    this.sharedata.getuser.subscribe(user => this.user = user);
    this.userheader.followers = 120;
    this.userheader.following = 78;
    this.userheader.gender = 'Female';
  }

  updateshareduser(){
    this.sharedata.setuser(this.user);
  }
}
