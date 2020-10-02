import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
baseUrl = 'http://localhost:60336/api/auth/';
jwtHelper = new JwtHelperService();
decodedToken: any;

constructor(private http: HttpClient) { }

login(model: any) {
  return this.http
  .post(this.baseUrl + 'login', model)
  .pipe(
    map((response: any) => {
      const user = response;
      if (user){
      localStorage.setItem('token', user.token);
     // localStorage.setItem('user', JSON.stringify(user.user));
      this.decodedToken = this.jwtHelper.decodeToken(user.token);
      console.log(this.decodedToken);
      // this.currentUser = user.user;
      // this.changeMemberPhoto(this.currentUser.photoUrl);

     }
   })
 );
}

register(model: any) {
  return this.http.post(this.baseUrl + 'register', model);
}

loggedIn() {
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}

}
