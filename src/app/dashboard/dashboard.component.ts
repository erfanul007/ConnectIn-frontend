import { Component, Input } from '@angular/core';
import { blog } from 'src/models/blog/blog';
import { userbasic } from 'src/models/user/userbasic';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { serverroot } from '../app.module';
import { SharedataService } from '../services/sharedata.service';
import { Router } from '@angular/router';
import { notification } from 'src/models/notification/notification';

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
    this.sharedata.getloggedinuser.subscribe(user =>{
      this.currentuser = user;
    });
    this.sharedata.getuser.subscribe(user =>{
      this.user = user;
      if(user.username){
        this.getprofilepost();
      }
      else{
        this.gethomepost();
      }
    });
    this.sharedata.getcreatenewblog.subscribe(blog => {
      if(blog.description){
        this.addnewpost(blog);
      }
    })
  }

  opensnackbar(message: string){
    this.snackbar.open(message, 'Close', {
      duration: 1000
    });
  }

  addnewpost(blog:blog){
    blog.createdby = this.currentuser;
    blog.createdon = new Date().toLocaleString();
    blog.comments = 0;
    blog.reacts = 0;
    blog.isreacted = false;
    blog.iscollapsed = true;
    this.posts = [blog, ...this.posts];
    this.sharedata.setcreatenewblog({} as blog);
    const notification: notification = {
      createdon: new Date().toLocaleString(),
      isread: false,
      message: 'Your post has been uploaded'
    }
    this.sharedata.setnotification(notification);
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

  deletepost(post: blog){
    const index = this.posts.indexOf(post);
    if(index != -1){
      this.posts.splice(index, 1);
    }
  }

  isceatepostshow():boolean{
    if(this.user.username && this.user.username != this.currentuser.username) return false;
    return true;
  }
}
