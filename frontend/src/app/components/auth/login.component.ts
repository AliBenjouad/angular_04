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
  };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {
    console.log('LoginComponent constructor initialized');
  }

  ngOnInit() {
    console.log('LoginComponent ngOnInit called');
  }

  onLogin(event: Event): void {
    event.preventDefault();
    console.log('onLogin method called');
    console.log('Login attempt with', this.user);
    this.authService.login(this.user).subscribe(
      (response) => {
        console.log('Login successful', response);
        this.router.navigate(['/questions']);
      },
      (error) => {
        console.error('Login failed', error);
        this.errorMessage = 'Login failed. Please check your credentials.';
      }
    );
  }

  onRegister(): void {
    console.log('onRegister method called');
    this.router.navigate(['/register']);
  }
}
