import { Component, OnInit } from '@angular/core';
import { Post } from '../../../models/post';
import { PostService } from '../../../services/post.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  post: Post = {
    title: undefined,
    message: undefined,
    user: undefined
  };

  constructor(
    private postService: PostService,
    private flashMessages: FlashMessagesService,
    private router: Router
  ) {}

  ngOnInit() {}

  onSubmit({ value, valid }: { value: Post; valid: boolean }) {
    if (!valid) {
      this.flashMessages.show('Plese fill in all fields', {
        cssClass: 'alert-danger',
        timeout: 3000
      });
      return false;
    }

    this.postService.newPost(value).subscribe(data => {
      if (data.success) {
        this.flashMessages.show('New Post created', {
          cssClass: 'alert-success',
          timeout: 3000
        });
        this.router.navigate(['/post/' + data._id]);
      }
    });
  }
}
