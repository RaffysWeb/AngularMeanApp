import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class PostService {

  constructor(
    private http: Http
  ) { }

  newPost(post) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/posts', post, { headers: headers })
      .map(res => res.json());
  }

  getPost(post) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/posts/post/' + post, { headers: headers })
      .map(res => res.json());
  }
}
