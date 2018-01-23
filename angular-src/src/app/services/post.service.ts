import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class PostService {

  constructor(
    private http: Http
  ) { }

  // Create post
  newPost(post) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/posts', post, { headers: headers })
      .map(res => res.json());
  }

  // Get single post
  getPost(post) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/posts/post/' + post, { headers: headers })
      .map(res => res.json());
  }

  // Get all posts
  getPosts() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/posts/', {headers: headers})
    .map(res => res.json());
  }
}
