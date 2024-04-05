import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { userbasic } from 'src/models/user/userbasic';
import { SharedataService } from '../services/sharedata.service';

@Injectable()
export class HttpheaderInterceptor implements HttpInterceptor {
  loggedinuser = {} as userbasic;
  constructor(private sharedata: SharedataService) {
    this.sharedata.getloggedinuser.subscribe(user => this.loggedinuser = user);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(request);
    if(this.loggedinuser.username){
      const authReq = request.clone({ setHeaders: { Authorization: this.loggedinuser.username } });
      return next.handle(authReq);
    }    
    return next.handle(request);
  }
}
