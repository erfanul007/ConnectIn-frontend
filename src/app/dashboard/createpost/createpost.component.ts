import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedataService } from 'src/app/services/sharedata.service';
import { blog } from 'src/models/blog/blog';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatepostComponent {
  textareaValue: string = '';
  ispublic: boolean = false;
  postformgroup: FormGroup;

  constructor(private sharedata: SharedataService, private snackbar: MatSnackBar){
    this.postformgroup = new FormGroup({
      description: new FormControl('', []),
      privacy: new FormControl('', []),
    });
  }

  onSubmit(){
    if(this.postformgroup.valid != true){
      return;
    }
    console.log(this.postformgroup.value);
    if(this.postformgroup.value.description === ''){
      this.snackbar.open('Can\'t share empty post', 'Close', {
        duration: 1000
      });
    }
    if(this.postformgroup.value.privacy === ''){
      this.snackbar.open('Select privacy', 'Close', {
        duration: 1000
      });
    }
    const blog = {} as blog;
    blog.description = '<p>' + this.postformgroup.value.description + '</p>';
    blog.ispublic = this.ispublic;
    this.sharedata.setcreatenewblog(blog);
    this.postformgroup.reset();
  }
}
