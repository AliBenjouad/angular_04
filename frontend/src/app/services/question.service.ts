import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  // Method to post a question
  postQuestion(question: any): Observable<any> {
    return this.http.post('/api/post-question', question); // Sending a POST request to post a question
  }

  // Method to search for questions by title
  searchQuestions(title: string): Observable<any> {
    return this.http.get(`/api/search-questions?title=${title}`); // Sending a GET request to search for questions
  }
}
