// src/app/components/questions/questions.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-questions', // Selector for this component
  standalone: true, // Indicates that this component is a standalone component
  imports: [],
  templateUrl: './questions.component.html', // Path to the HTML template
  styleUrls: ['./questions.component.css'] // Path to the CSS stylesheet
})
export class QuestionsComponent implements OnInit {
  questions: any[] = []; // Array to hold the list of questions

  // Constructor to inject the HttpClient service
  constructor(private http: HttpClient) {}

  // Lifecycle hook that is called after the component is initialized
  ngOnInit() {
    this.loadQuestions(); // Load the questions when the component is initialized
  }

  // Method to load questions from the server
  loadQuestions() {
    this.http.get<any[]>('/api/questions').subscribe(
      (data) => {
        this.questions = data; // Assign the received data to the questions array
      },
      (error) => {
        console.error('Error loading questions:', error); // Log error message
      }
    );
  }
}
