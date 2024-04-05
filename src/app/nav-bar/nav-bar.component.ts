import { Component } from '@angular/core';
import { SharedataService } from '../services/sharedata.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  brandName = 'ConnectIn';
  loggedIn = false;

  constructor(private sharedata: SharedataService){
    this.sharedata.getloggedinuser.subscribe((user) => {
      if(user.username){
        this.loggedIn = true;
      }
      else{
        this.loggedIn = false;
      }
    })
  }
  search(query: string) {
    
  }
}
