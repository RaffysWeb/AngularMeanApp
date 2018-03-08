import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class PostService {
  headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(
    private http: Http
  ) { }

  // Create post
  newPost(post) {
    const token = localStorage.getItem('id_token')
    ? '?token=' + localStorage.getItem('id_token')
    : '';
    return this.http.post('http://localhost:3000/posts' + token, post, { headers: this.headers })
      .map(res => res.json());
  }

  // Get single post
  getPost(postId) {
    const token = localStorage.getItem('id_token')
    ? '?token=' + localStorage.getItem('id_token')
    : '';
    return this.http.post('http://localhost:3000/posts/post/' + postId + token, { headers: this.headers })
      .map(res => res.json());
  }

  // Get all posts
  getPosts() {
    const token = localStorage.getItem('id_token')
    ? '?token=' + localStorage.getItem('id_token')
    : '';
    return this.http.get('http://localhost:3000/posts/' + token, { headers: this.headers })
      .map(res => res.json());
  }

  // Get Message
  getMessage(message) {
    const token = localStorage.getItem('id_token')
    ? '?token=' + localStorage.getItem('id_token')
    : '';
    return this.http.get('http://localhost:3000/posts/message/' + message + token, { headers: this.headers })
      .map(res => res.json());
  }

  // New Message
  newMessage(message, postId) {
   const token = localStorage.getItem('id_token')
    ? '?token=' + localStorage.getItem('id_token')
    : '';
    return this.http.post('http://localhost:3000/posts/post/' + postId + '/message/' + token, message, { headers: this.headers })
      .map(res => res.json());
  }

  // Edit Message
  editMessage(message) {
    const token = localStorage.getItem('id_token')
    ? '?token=' + localStorage.getItem('id_token')
    : '';
    return this.http.patch('http://localhost:3000/posts/message/' + message._id + token, message, { headers: this.headers })
      .map(res => res.json());
  }

  // Delete Message
  deleteMessage(message) {
    const token = localStorage.getItem('id_token')
    ? '?token=' + localStorage.getItem('id_token')
    : '';
    return this.http.delete('http://localhost:3000/posts/message/' + message + token, { headers: this.headers })
      .map(res => res.json());
  }
}
