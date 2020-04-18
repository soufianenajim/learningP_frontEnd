
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../../../environments/environment";
import { TokenStorageService } from '../token_storage/token-storage.service';
import { Router } from '@angular/router';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
 
  AUTH_API = environment.baseUrl + "/auth";
  constructor(private http: HttpClient,private tokenStorageService:TokenStorageService,private router: Router) { }

  login(credentials): Observable<any> {
    console.log('credentials',credentials);
    return this.http.post(this.AUTH_API + '/signin', {
      username: credentials.email,
      password: credentials.password
    }, httpOptions);
  }

  logout() {
    // remove user from local storage to log user out

    this.tokenStorageService.signOut();
    
    this.router.navigate(['login']);
   
  }
}
