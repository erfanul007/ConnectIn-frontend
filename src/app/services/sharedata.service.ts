import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { notification } from 'src/models/notification/notification';
import { userbasic } from 'src/models/user/userbasic';

@Injectable({
  providedIn: 'root'
})
export class SharedataService {
  private user = new BehaviorSubject({} as userbasic);
  private notification = new BehaviorSubject({} as notification);
  private loggeinuser = new BehaviorSubject({} as userbasic);

  getuser = this.user.asObservable();
  getnotification = this.notification.asObservable();
  getloggedinuser = this.loggeinuser.asObservable();

  constructor() { }

  setuser(user: userbasic){
    this.user.next(user);
  }

  setnotification(notification: notification){
    this.notification.next(notification);
  }

  setloggedinUser(user: userbasic){
    this.loggeinuser.next(user);
  }
}
