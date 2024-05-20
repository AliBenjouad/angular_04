import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:5001/api/comments';

  constructor(private http: HttpClient) {}

  addComment(comment: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${comment.answerId}`, comment);
  }

  getComments(answerId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${answerId}`);
  }
}
