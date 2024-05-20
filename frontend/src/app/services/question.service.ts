import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  postQuestion(question: any): Observable<any> {
    return this.http.post('/api/post-question', question);
  }

  searchQuestions(title: string): Observable<any> {
    return this.http.get(`/api/search-questions?title=${title}`);
  }
}
