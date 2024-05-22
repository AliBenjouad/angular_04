// src/app/components/auth/login.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any = {
    email: '',
    password: ''
  }; // Object to hold user login credentials
  errorMessage: string = ''; // Variable to store error messages

  constructor(private authService: AuthService, private router: Router) {
    console.log('LoginComponent constructor initialized'); // Logging constructor initialization
  }

  ngOnInit() {
    console.log('LoginComponent ngOnInit called'); // Logging ngOnInit lifecycle hook
  }

  onLogin(event: Event): void {
    event.preventDefault(); // Preventing default form submission behavior
    console.log('onLogin method called'); // Logging method call
    console.log('Login attempt with', this.user); // Logging user login attempt
    this.authService.login(this.user).subscribe( // Calling AuthService login method
      (response) => {
        console.log('Login successful', response); // Logging successful login
        this.router.navigate(['/questions']); // Redirecting to questions page on successful login
      },
      (error) => {
        console.error('Login failed', error); // Logging failed login
        this.errorMessage = 'Login failed. Please check your credentials.'; // Setting error message
      }
    );
  }

  onRegister(): void {
    console.log('onRegister method called'); // Logging method call
    this.router.navigate(['/register']); // Redirecting to register page
  }
}
