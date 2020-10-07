import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}; // for login form
  photoUrl: string; // for photo of user in navbar after login

  // all essential service for this component
  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    // getting photourl from service to display in nav component
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl); 
  }

  // calling login method of auth service
  // if login successful then we are displaying alertify notification that user is logged in
  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Logged in successfully');
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.router.navigate(['/members']); // redirecting to member page after succesfull login
    });
  }

  loggedIn() {
    return this.authService.loggedIn(); // calling logged method of user service, generally checking token available or not
  }

  // when logout click event is fired from template form we are removing token from localstorage of browser.
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alertify.message('logged out');
    this.router.navigate(['/home']); // navigating to home component after logout
  }

}
