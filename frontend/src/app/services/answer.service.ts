import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private http: HttpClient) { }

  answerQuestion(answer: any): Observable<any> {
    return this.http.post('/api/answer-question', answer);
  }

  approveAnswer(answerId: string): Observable<any> {
    return this.http.post('/api/approve-answer', { id: answerId });
  }

  rateAnswer(answerId: string, rating: number): Observable<any> {
    return this.http.post('/api/rate-answer', { id: answerId, rating });
  }

  upvoteAnswer(answerId: string): Observable<any> {
    return this.http.post('/api/upvote-answer', { id: answerId });
  }
}
