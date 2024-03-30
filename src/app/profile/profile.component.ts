import { Component } from '@angular/core';
import { userprofile } from 'src/models/userprofile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user = {} as userprofile;
  constructor(){
    this.user.username = 'erfanul007';
    this.user.fname = 'Md Erfanul Islam';
    this.user.lname = 'Bhuiyan';
    this.user.followers = 120;
    this.user.following = 78;
  }
}
