// src/app/components/auth/auth.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth', // Selector for this component
  templateUrl: './auth.component.html', // Path to the HTML template
  styleUrls: ['./auth.component.css'] // Path to the CSS stylesheet
})
export class AuthComponent {

  // Constructor to inject the AuthService
  constructor(private authService: AuthService) { }

  // Method to register a user
  register(user: any) {
    // Call the service method to register the user
    this.authService.register(user).subscribe(response => {
      console.log('User registered', response); // Log the response on successful registration
    });
  }

  // Method to log in a user
  login(credentials: any) {
    // Call the service method to log in the user
    this.authService.login(credentials).subscribe(response => {
      console.log('User logged in', response); // Log the response on successful login
    });
  }
}
