import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { User } from '../models/User';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
    'Authorization': `Bearer ${localStorage.token}`})
};

@Injectable()
export class AuthService {

  token = localStorage.token;
  baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {
  }

  login(data): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/login', data, httpOptions)
      .map(res => {
        localStorage.setItem('token', res['data']['token']);
      });
  }

  signup(data) {
    return this.http.post<User>(this.baseUrl + '/register', data, httpOptions);
  }

  logout() {
    localStorage.removeItem('token');
    return this.http.get(this.baseUrl + '/logout', httpOptions);
  }

  isLogin() {
    return localStorage.getItem('token') != null;
  }

  getUser() {
    return this.http.get(this.baseUrl + '/getuser', httpOptions);
  }

}
