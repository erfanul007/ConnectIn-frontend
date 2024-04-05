import { Component } from '@angular/core';
import { blog } from 'src/models/blog/blog';
import { userbasic } from 'src/models/user/userbasic';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { serverroot } from '../app.module';
import { SharedataService } from '../services/sharedata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  posts = [] as blog[];
  mxcharperblog = 280;
  user = {} as userbasic;
  currentuser = {} as userbasic;
  constructor(private snackbar: MatSnackBar, private http: HttpClient, private sharedata: SharedataService, private router: Router){
    this.gethomepost();
    this.sharedata.getloggedinuser.subscribe(user => this.currentuser = user);
    this.sharedata.getuser.subscribe(user =>{
      if(user.username){
        this.user = user;
        this.getprofilepost();
      }
    });
  }

  opensnackbar(message: string){
    this.snackbar.open(message, 'Close', {
      duration: 1000
    });
  }

  getprofilepost(){
    const apiurl = serverroot + 'user-blogs' + '?count=20';
    this.http.post<blog[]>(apiurl, this.user).subscribe({
      next: (response) => {
        this.posts = response;
      }
    });
  }

  getmoreposts(){
    if(this.user.username){
      this.getmoreprofilepost();
    }
    else{
      this.getmorehomepost();
    }
  }

  getmoreprofilepost(){
    const apiurl = serverroot + 'user-blogs' + '?count=10';
    this.http.post<blog[]>(apiurl, this.user).subscribe({
      next: (response) => {
        this.posts.push(...response);
      }
    });
  }

  gethomepost(){
    const apiurl = serverroot + 'blogs' + '?count=50';
    this.http.get<blog[]>(apiurl).subscribe({
      next: (response) => {
        this.posts = response;
      }
    });
  }

  getmorehomepost(){
    const apiurl = serverroot + 'blogs' + '?count=20';
    this.http.get<blog[]>(apiurl).subscribe({
      next: (response) => {
        this.posts.push(...response);
      }
    });
  }

  gotoprofile(user: userbasic){
    this.sharedata.setuser(user);
    this.router.navigate(['/profile/' + user.username]);
  }

  addreaction(blog:blog){
    if(this.currentuser.username){
      if(blog.isreacted){
        blog.isreacted = false;
        blog.reacts = blog.reacts - 1;
        // add the http call to save reaction removing
      }
      else{
        blog.isreacted = true;
        blog.reacts = blog.reacts + 1;
        // add the http call to save reaction adding
      }
    }
    else{
      const message = 'You must log in to react';
      this.snackbar.open(message, 'Close', {
        duration: 1000
      });
    }
  }

  filterprivate(posts: blog[]): blog[]{
    if(!this.currentuser.username){
      console.log(posts);
      return posts.filter(blog => blog.ispublic);
    }
    return posts;
  }
}
