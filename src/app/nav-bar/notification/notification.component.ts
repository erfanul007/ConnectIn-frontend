import { Component } from '@angular/core';
import { SharedataService } from 'src/app/services/sharedata.service';
import { notification } from 'src/models/notification/notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent {
  notifications = [] as notification[];
  newnotification = 0;

  constructor(private sharedata: SharedataService) {
    this.sharedata.getnotification.subscribe((noti) => {
      if(noti.message){
        this.notifications.push(noti);
        this.newnotification = this.newnotification + 1;
      }
    });
    const notification = {} as notification;
    notification.createdon = '4/4/2024 3:48 PM';
    notification.isread = false;
    notification.message = 'Demo for new post is update';
    this.sharedata.setnotification(notification);
    const noti2 = {...notification};
    noti2.message = 'Demo for new comment is updated'
    this.sharedata.setnotification(noti2);
  }

  markasread($event:any, notification: notification) {
    notification.isread = true;
    $event.stopPropagation();
  }

  markallasread($event:any){
    this.notifications.forEach(notification => {
      notification.isread = true;
    });
    $event.stopPropagation();
  }

  updatenewnotification(){
    this.newnotification = 0;
  }
}
