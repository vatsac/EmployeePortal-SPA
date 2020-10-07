import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false; // this is bool variable for toggle between sign up form and project theme

  constructor() { }

  ngOnInit() {
  }
 // In this function we are setting above bool variable register mode to true
  registerToggle() {
    this.registerMode = true;
  }

  // Same as above function but this is for cancel button
  cancelRegisterMode(registerMode: boolean) {
    this.registerMode = registerMode;
  }

}
