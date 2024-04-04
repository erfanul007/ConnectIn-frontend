import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedataService } from '../services/sharedata.service';
import { userbasic } from 'src/models/user/userbasic';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  loggedin = false;
  constructor(private router: Router, private sharedata: SharedataService){
    this.sharedata.getloggedinuser.subscribe((user) => {
      if(user.username){
        this.loggedin = true;
      }
    });
    if(!this.loggedin){
      this.router.navigate(['/']);
    }
  }
}
