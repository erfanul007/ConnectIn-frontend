import { Component } from '@angular/core';
import { schooldetails } from 'src/models/schooldetails';
import { userinfo } from 'src/models/userinfo';
import { workdetails } from 'src/models/workdetails';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css'],
})
export class IntroComponent {
  userdetails = {} as userinfo;
  constructor() {
    this.userdetails.bio = 'Amar ei duniay debar kichu nai, ache shudhu bhalobasha dia gelam tai';
    const worked = {} as workdetails;
    worked.company = 'Enosis Solutions';
    worked.position = 'Software Engineer';
    worked.iscurrent = true;
    this.userdetails.work = [];
    console.log(this.userdetails);
    this.userdetails.work.push(worked);
    const worked2:workdetails = {...worked};
    worked2.iscurrent = false;
    this.userdetails.work.push(worked2);
    const school = {} as schooldetails;
    school.institute = 'Daffodil International University';
    school.degree = 'Computer Science and Engineering';
    school.iscurrent = false;
    this.userdetails.school = [];
    this.userdetails.school.push(school);
    const school2 : schooldetails = {...school};
    school2.iscurrent = true;
    this.userdetails.school.push(school2)
    this.userdetails.livesin = 'Dhaka, Bangladesh';
    this.userdetails.hometown = 'Cumilla, Bangladesh';
  }
}
