// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login.component';
import { RegisterComponent } from './components/auth/register.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from "./components/home/home.component";

// Define the routes for the application
export const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Route for the login page
  { path: 'register', component: RegisterComponent }, // Route for the registration page
  { path: 'questions', component: QuestionsComponent }, // Route for the questions page
  { path: 'home', component: HomeComponent }, // Route for the home page
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route, redirects to login page
  { path: '**', component: NotFoundComponent } // Wildcard route for handling 404 (not found) errors
];
