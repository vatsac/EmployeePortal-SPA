import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 model: any = {};
 @Output() cancelRegister = new EventEmitter();

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  register(){
   // if (this.registerForm.valid) {
   //   this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.model).subscribe(() => {
         this.alertify.success('Registration successfull');
      }, error => {
         this.alertify.error(error);
     // } // , () => {
       // this.authService.login(this.user).subscribe(() => {
        //  this.router.navigate(['/members']);
       // });
      });
     }


  cancel() {
    this.cancelRegister.emit(false);
    console.log('cancelled');
  }

}
