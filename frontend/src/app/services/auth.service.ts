import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5001/api/users';

  constructor(private http: HttpClient) {
    console.log('AuthService initialized with baseUrl:', this.baseUrl);
  }

  register(user: any): Observable<any> {
    console.log('AuthService register called with user:', user);
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  login(user: any): Observable<any> {
    console.log('AuthService login called with user:', user);
    return this.http.post(`${this.baseUrl}/login`, user);
  }
}
