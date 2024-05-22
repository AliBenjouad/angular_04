import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5001/api/users'; // Base URL for API endpoints

  constructor(private http: HttpClient) {
    console.log('AuthService initialized with baseUrl:', this.baseUrl); // Logging initialization with base URL
  }

  // Method to register a user
  register(user: any): Observable<any> {
    console.log('AuthService register called with user:', user); // Logging registration attempt with user data
    return this.http.post(`${this.baseUrl}/register`, user); // Sending a POST request to register endpoint
  }

  // Method to log in a user
  login(user: any): Observable<any> {
    console.log('AuthService login called with user:', user); // Logging login attempt with user data
    return this.http.post(`${this.baseUrl}/login`, user); // Sending a POST request to login endpoint
  }
}
