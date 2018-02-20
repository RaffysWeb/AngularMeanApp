import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class PostService {
  headers = new Headers({ 'Content-Type': 'application/json' });

  token = localStorage.getItem('id_token')
    ? '?token=' + localStorage.getItem('id_token')
    : '';

  constructor(
    private http: Http
  ) { }

  // Create post
  newPost(post) {
    return this.http.post('http://localhost:3000/posts' + this.token, post, { headers: this.headers })
      .map(res => res.json());
  }

  // Get single post
  getPost(postId) {
    return this.http.post('http://localhost:3000/posts/post/' + postId + this.token, { headers: this.headers })
      .map(res => res.json());
  }

  // Get all posts
  getPosts() {
    return this.http.get('http://localhost:3000/posts/' + this.token, { headers: this.headers })
      .map(res => res.json());
  }

  // Get Message
  getMessage(message) {
    return this.http.get('http://localhost:3000/posts/message/' + message + this.token, { headers: this.headers })
      .map(res => res.json());
  }

  // New Message
  newMessage(message, postId) {
    return this.http.post('http://localhost:3000/posts/post/' + postId + '/message/' + this.token, message, { headers: this.headers })
      .map(res => res.json());
  }

  // Edit Message
  editMessage(message) {
    return this.http.patch('http://localhost:3000/posts/message/' + message._id + this.token, message, { headers: this.headers })
      .map(res => res.json());
  }

  // Delete Message
  deleteMessage(message) {
    return this.http.delete('http://localhost:3000/posts/message/' + message + this.token, { headers: this.headers })
      .map(res => res.json());
  }
}
