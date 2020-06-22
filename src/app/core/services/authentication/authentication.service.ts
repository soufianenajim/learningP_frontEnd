
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../../../environments/environment";
import { TokenStorageService } from '../token_storage/token-storage.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../user/user.service';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  login_url = environment.baseUrl + "/auth";
  logout_url=environment.baseUrl + "/user/logout";
  // AUTH_API = environment.baseUrl + "/auth";
  // constructor(private http: HttpClient,private tokenStorageService:TokenStorageService,private router: Router) { }

  // login(credentials): Observable<any> {
  //   console.log('credentials',credentials);
  //   return this.http.post(this.AUTH_API + '/signin', {
  //     username: credentials.email,
  //     password: credentials.password
  //   }, httpOptions);
  // }

  // logout() {
  //   // remove user from local storage to log user out

  //   this.tokenStorageService.signOut();
    
  //   this.router.navigate(['login']);
   
  // }
  constructor(
    private router: Router,
    private http: HttpClient,
    private userService: UserService
     ) {

  }

  getToken() {

    return localStorage.getItem('data');
  }

  isLoggedIn() {

    return this.getToken() !== null;
  }


  getRoles() {
    if (localStorage.getItem('data')) {
      return JSON.parse(localStorage.getItem('data')).authorities;
    }
  }

  getUsername() {
    if (localStorage.getItem('data')) {
      return JSON.parse(localStorage.getItem('data')).username;
    }
  }
  isNew(): boolean {

    if (localStorage.getItem('data')) {
      return JSON.parse(localStorage.getItem('data')).isNew;
    }
    return false;
  }
  login(user: User): Observable<User> {

    return this.http.post<User>(this.login_url, JSON.stringify(user));
  }

  logout():Observable<any> {
   
  
   return this.http.get(this.logout_url);
    
  
  }
}
