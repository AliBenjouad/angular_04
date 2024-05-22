import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: any[] = []; // Array to store fetched posts

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts(); // Fetching posts when the component initializes
  }

  fetchPosts() {
    // Method to fetch posts from the server
    this.http.get('/api/posts').subscribe((data: any) => {
      this.posts = data; // Storing fetched posts in the posts array
    });
  }

  likePost(post: { _id: any; likes: any; dislikes: any; }) {
    // Method to handle liking a post
    this.http.post(`/api/posts/${post._id}/like`, {}).subscribe((data: any) => {
      // Sending a POST request to the server to like the post
      post.likes = data.likes; // Updating the likes count of the post
      post.dislikes = data.dislikes; // Updating the dislikes count of the post
    });
  }

  dislikePost(post: { _id: any; likes: any; dislikes: any; }) {
    // Method to handle disliking a post
    this.http.post(`/api/posts/${post._id}/dislike`, {}).subscribe((data: any) => {
      // Sending a POST request to the server to dislike the post
      post.likes = data.likes; // Updating the likes count of the post
      post.dislikes = data.dislikes; // Updating the dislikes count of the post
    });
  }
}
