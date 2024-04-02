import { Component } from '@angular/core';
import { userbasic } from 'src/models/user/userbasic';
import { userprofile } from 'src/models/user/userprofile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user = {} as userbasic;
  userheader = {} as userprofile;
  constructor(){
    this.user.username = 'erfanul007';
    this.user.fname = 'Md Erfanul Islam';
    this.user.lname = 'Bhuiyan';
    this.user.headline = 'Software Engineer | Competive Programmer | Problem Solver'
    this.userheader.followers = 120;
    this.userheader.following = 78;
    this.userheader.gender = 'Female';
  }
}
