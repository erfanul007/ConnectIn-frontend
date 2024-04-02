import { Component } from '@angular/core';
import { blog } from 'src/models/blog/blog';
import { userbasic } from 'src/models/user/userbasic';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  posts: blog[];
  mxcharperblog = 280;
  constructor(private datePipe: DatePipe, private snackbar: MatSnackBar){
    this.snackbar = snackbar
    this.posts = [] as blog[];
    const blog = {} as blog;
    const user = {} as userbasic;
    user.fname = 'Erfanul';
    user.lname = 'Islam';
    user.username = 'erfanul007';
    blog.createdby = user;
    blog.createdon = new Date(2024, 4, 1, 17, 6);
    blog.description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam lorem nec turpis eleifend, a hendrerit dui sollicitudin. Vestibulum id lacus id nisl tincidunt tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam lorem nec turpis eleifend, a hendrerit dui sollicitudin. Vestibulum id lacus id nisl tincidunt tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam lorem nec turpis eleifend, a hendrerit dui sollicitudin. Vestibulum id lacus id nisl tincidunt tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam lorem nec turpis eleifend, a hendrerit dui sollicitudin. Vestibulum id lacus id nisl tincidunt tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam lorem nec turpis eleifend, a hendrerit dui sollicitudin. Vestibulum id lacus id nisl tincidunt tincidunt.';
    blog.reacts = 233;
    blog.comments = 14;
    blog.ispublic = true;
    this.posts.push(blog);
    const blog2 = {...blog};
    this.posts.push(blog2);
  }

  opensnackbar(message: string){
    this.snackbar.open(message, 'Close', {
      duration: 1000
    });
  }
}
