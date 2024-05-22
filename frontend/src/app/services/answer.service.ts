import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private http: HttpClient) { }

  // Method to submit an answer to a question
  answerQuestion(answer: any): Observable<any> {
    return this.http.post('/api/answer-question', answer);
  }

  // Method to approve an answer
  approveAnswer(answerId: string): Observable<any> {
    return this.http.post('/api/approve-answer', { id: answerId });
  }

  // Method to rate an answer
  rateAnswer(answerId: string, rating: number): Observable<any> {
    return this.http.post('/api/rate-answer', { id: answerId, rating });
  }

  // Method to upvote an answer
  upvoteAnswer(answerId: string): Observable<any> {
    return this.http.post('/api/upvote-answer', { id: answerId });
  }
}
