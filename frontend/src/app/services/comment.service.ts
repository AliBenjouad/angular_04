import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:5001/api/comments'; // Base URL for API endpoints

  constructor(private http: HttpClient) {}

  // Method to add a comment to an answer
  addComment(comment: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${comment.answerId}`, comment); // Sending a POST request to add a comment
  }

  // Method to get comments for a specific answer
  getComments(answerId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${answerId}`); // Sending a GET request to fetch comments for an answer
  }
}
