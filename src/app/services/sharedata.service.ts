import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { blog } from 'src/models/blog/blog';
import { notification } from 'src/models/notification/notification';
import { responsestatus } from 'src/models/observable/responsestatus';
import { registeruser } from 'src/models/user/registeruser';
import { userbasic } from 'src/models/user/userbasic';

@Injectable({
  providedIn: 'root'
})
export class SharedataService {
  private user = new BehaviorSubject({} as userbasic);
  private notification = new BehaviorSubject({} as notification);
  private loggeinuser = new BehaviorSubject({} as userbasic);
  private newuser = new BehaviorSubject({} as registeruser);
  private loginresponose = new BehaviorSubject('');
  private registerresponose = new BehaviorSubject('');
  private createnewblog = new BehaviorSubject({} as blog);

  getuser = this.user.asObservable();
  getnotification = this.notification.asObservable();
  getloggedinuser = this.loggeinuser.asObservable();
  getnewuser = this.newuser.asObservable();
  getloginresponse = this.loginresponose.asObservable();
  getregisterresponose = this.registerresponose.asObservable();
  getcreatenewblog = this.createnewblog.asObservable();

  constructor() { }

  setuser(user: userbasic){
    this.user.next(user);
  }

  setnotification(notification: notification){
    this.notification.next(notification);
  }

  setloggedinuser(user: userbasic){
    this.loggeinuser.next(user);
  }

  setnewuser(user: registeruser){
    this.newuser.next(user);
  }

  setloginresponse(responose: string){
    this.loginresponose.next(responose);
  }

  setregisterresponse(responose: string){
    this.registerresponose.next(responose);
  }

  setcreatenewblog(blog: blog){
    this.createnewblog.next(blog);
  }
}
