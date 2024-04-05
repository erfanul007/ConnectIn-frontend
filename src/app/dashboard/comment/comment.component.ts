import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { serverroot } from 'src/app/app.module';
import { SharedataService } from 'src/app/services/sharedata.service';
import { blog } from 'src/models/blog/blog';
import { comment } from 'src/models/comment/comment';
import { userbasic } from 'src/models/user/userbasic';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {
  comments = [] as comment[];
  currentuser = {} as userbasic;
  postcommentgroup: FormGroup;

  @Input() post:any;

  constructor(private http:HttpClient, private sharedata: SharedataService, private snackbar: MatSnackBar){
    this.sharedata.getloggedinuser.subscribe(user => this.currentuser = user);
    this.postcommentgroup = new FormGroup({
      description: new FormControl('', [])
    });
    this.getcomments();
  }

  getcomments(){
    const apiurl = serverroot + 'comments';
    this.http.get<comment[]>(apiurl).subscribe({
      next: (resp) =>{
        console.log(resp);
        this.comments = [...resp, ...this.comments];
      },
      error: (err) =>{
        console.log(err);
      }
    });
  }

  addreaction(comment:comment){
    if(this.currentuser.username){
      if(comment.isreacted){
        comment.isreacted = false;
        comment.reactions = comment.reactions - 1;
        // add the http call to save reaction removing
      }
      else{
        comment.isreacted = true;
        comment.reactions = comment.reactions + 1;
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

  onSubmit(){
    if(this.postcommentgroup.valid != true){
      return;
    }
    if(this.postcommentgroup.value.description){
      const comment = {} as comment;
      comment.message = this.postcommentgroup.value.description;
      comment.createdby = this.currentuser;
      comment.createdon = new Date().toLocaleString();
      comment.reactions = 0;
      comment.isreacted = false;
      this.comments.push(comment);
    }
    this.postcommentgroup.reset();
  }
  deleteComment(comment: comment){
    const index = this.comments.indexOf(comment);
    if (index !== -1) {
        this.comments.splice(index, 1);
    }
  }
}
