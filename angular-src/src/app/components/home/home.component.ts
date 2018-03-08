import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: Post[];
  constructor(
    private authService: AuthService,
    private postService: PostService
  ) { }

  ngOnInit() {
    this.postService.getPosts().subscribe(data => {
      this.posts = data.obj;
    });
  }

}
