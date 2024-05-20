// src/app/components/auth/register.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register', // Selector for this component
  templateUrl: './register.component.html', // Path to the HTML template
  styleUrls: ['./register.component.css'] // Path to the CSS stylesheet
})
export class RegisterComponent {
  user: any = {
    name: '', // Name field for the registration form
    email: '', // Email field for the registration form
    password: '' // Password field for the registration form
  };
  errorMessage: string = ''; // Variable to hold error message

  // Constructor to inject necessary services
  constructor(private authService: AuthService, private router: Router) { }

  // Method to handle the registration form submission
  onRegister(): void {
    console.log('Register attempt with', this.user); // Log the registration attempt
    // Call the service method to register the user
    this.authService.register(this.user).subscribe(
      (response) => {
        console.log('Registration successful', response); // Log success message
        this.router.navigate(['/login']); // Navigate to the login page on successful registration
      },
      (error) => {
        console.error('Registration failed', error); // Log error message
        this.errorMessage = 'Registration failed. Please try again.'; // Set the error message
      }
    );
  }

  // Method to navigate to the login page
  onLogin(): void {
    console.log('onLogin method called');
    this.router.navigate(['/login']); // Navigate to the login page
  }
}
