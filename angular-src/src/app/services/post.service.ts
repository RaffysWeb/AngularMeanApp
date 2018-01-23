import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class PostService {

  token = localStorage.getItem('id_token')
    ? '?token=' + localStorage.getItem('id_token')
    : '';

  constructor(
    private http: Http
  ) { }

  // Create post
  newPost(post) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/posts' + this.token, post, { headers: headers })
      .map(res => res.json());
  }

  // Get single post
  getPost(post) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/posts/post/'  + post + this.token, { headers: headers })
      .map(res => res.json());
  }

  // Get all posts
  getPosts() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/posts/' + this.token, { headers: headers })
      .map(res => res.json());
  }
}
