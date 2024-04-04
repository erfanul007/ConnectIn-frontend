import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Routes, RouterModule } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthserviceService } from './services/authservice.service';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { IntroComponent } from './profile/intro/intro.component';
import { NotificationComponent } from './nav-bar/notification/notification.component';
import { UserMenuComponent } from './nav-bar/user-menu/user-menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatDividerModule } from '@angular/material/divider';
import { HomeComponent } from './home/home.component';
import { ShortprofileComponent } from './home/shortprofile/shortprofile.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedataService } from './services/sharedata.service';

const appRoute: Routes = [
  { path: '', component: LandingComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile/:username', component: ProfileComponent },
];

export const serverroot = 'http://localhost:3001/';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    LandingComponent,
    SignupComponent,
    ProfileComponent,
    IntroComponent,
    NotificationComponent,
    UserMenuComponent,
    DashboardComponent,
    HomeComponent,
    ShortprofileComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoute),
    BrowserAnimationsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatMenuModule,
    MatBadgeModule,
    ClipboardModule,
    MatSnackBarModule,
    MatDividerModule,
    HttpClientModule,
  ],
  providers: [
    DatePipe,
    MatSnackBar,
    AuthserviceService,
    SharedataService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
