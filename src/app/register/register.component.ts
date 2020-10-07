import { User } from './../_models/user';
import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter(); // Event generated from register to home component.
  user: User; // User Model
  registerForm: FormGroup; // We are using reactive form so form to be declared.
  bsConfig: Partial<BsDatepickerConfig>; // used for datepicker, setting datepicker theme property.

  constructor(private authService: AuthService, private alertify: AlertifyService ,
              private fb: FormBuilder, private router: Router) { } // calling required services and module

  ngOnInit() {
    // In register Form for date, we are using date picker, setting the theme for datepicker
    this.bsConfig = {
containerClass: 'theme-blue'
    },
    this.createRegisterForm(); // creating the register form on initialization of register form
  }

  // creating form and setting important property for sign up form
  createRegisterForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

  // Comparing Create password and confirm password
  // if not matched showing error to  end user that "Password Not Matched".
  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {mismatch: true};
  }

  // calling register method available in user service.
  // if success we are showing alertify notification that Registration Successfull
  // if registration successfull redirect to List of employee component
 register(){
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(() => {
        this.alertify.success('Registration successfull');
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.authService.login(this.user).subscribe(() => {
          this.router.navigate(['/members']);
        });
      });
     }
     }

 // For cancel button in signup form
 // we are using output property so we are emitting event here.
 // register to home component
  cancel() {
    this.cancelRegister.emit(false);
  }

}
