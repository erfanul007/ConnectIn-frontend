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
  constructor(private snackbar: MatSnackBar, private http: HttpClient, private sharedata: SharedataService, private router: Router){
    this.sharedata.getuser.subscribe(user => this.user = user);
    this.getPosts();
  }

  opensnackbar(message: string){
    this.snackbar.open(message, 'Close', {
      duration: 1000
    });
  }

  getPosts(){
    if(this.user.username){
      const apiurl = serverroot + 'user-blogs';
      this.http.post<blog[]>(apiurl, this.user).subscribe({
        next: (response) => {
          this.posts.push(...response);
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
    else{
      const apiurl = serverroot + 'blogs';
      this.http.get<blog[]>(apiurl).subscribe({
        next: (response) => {
          this.posts.push(...response);
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

  gotoprofile(user: userbasic){
    this.sharedata.setuser(user);
    this.router.navigate(['/profile/' + user.username]);
  }

  addreaction(blog:blog){
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
}
