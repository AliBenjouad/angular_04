// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login.component';
import { RegisterComponent } from './components/auth/register.component';
import { PostQuestionComponent } from './components/questions/post-question.component';
import { AnswerQuestionComponent } from './components/answers/answer-question.component';
import { ApproveAnswerComponent } from './components/answers/approve-answer.component';
import { RateAnswerComponent } from './components/answers/rate-answer.component';
import { UpvoteAnswerComponent } from './components/answers/upvote-answer.component';
import { SearchQuestionComponent } from './components/questions/search-question.component';
import { CommentAnswerComponent } from './components/comments/comment-answer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

// Define the routes for the application
const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Route for the login page
  { path: 'register', component: RegisterComponent }, // Route for the registration page
  { path: 'post-question', component: PostQuestionComponent }, // Route for posting a new question
  { path: 'answer-question', component: AnswerQuestionComponent }, // Route for answering a question
  { path: 'approve-answer', component: ApproveAnswerComponent }, // Route for approving an answer
  { path: 'rate-answer', component: RateAnswerComponent }, // Route for rating an answer
  { path: 'upvote-answer', component: UpvoteAnswerComponent }, // Route for upvoting an answer
  { path: 'search-question', component: SearchQuestionComponent }, // Route for searching for a question
  { path: 'comment-answer', component: CommentAnswerComponent }, // Route for commenting on an answer
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route, redirects to login page
  { path: '**', component: NotFoundComponent } // Wildcard route for handling 404 (not found) errors
];

// Configure and export the AppRoutingModule
@NgModule({
  imports: [RouterModule.forRoot(routes)], // Import the RouterModule with the defined routes
  exports: [RouterModule] // Export the RouterModule to make it available throughout the application
})
export class AppRoutingModule { }
