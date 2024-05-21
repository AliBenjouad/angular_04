import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  fetchPosts() {
    this.http.get('/api/posts').subscribe((data: any) => {
      this.posts = data;
    });
  }

  likePost(post: { _id: any; likes: any; dislikes: any; }) {
    this.http.post(`/api/posts/${post._id}/like`, {}).subscribe((data: any) => {
      post.likes = data.likes;
      post.dislikes = data.dislikes;
    });
  }

  dislikePost(post: { _id: any; likes: any; dislikes: any; }) {
    this.http.post(`/api/posts/${post._id}/dislike`, {}).subscribe((data: any) => {
      post.likes = data.likes;
      post.dislikes = data.dislikes;
    });
  }
}
