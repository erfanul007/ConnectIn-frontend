import { Component } from '@angular/core';
import { notification } from 'src/models/notification/notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  notifications = [] as notification[];

  constructor(){
    const not1 = {} as notification;
    not1.createdon = new Date(2024, 3, 31, 17, 58);
    not1.description = 'Notficiation got successfully';
    not1.type = 'success';
    not1.isread = false;
    this.notifications.push(not1);
    this.notifications.push(not1);
  }
}
