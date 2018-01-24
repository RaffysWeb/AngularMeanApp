import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Post } from '../../../models/post';
import { Message } from '../../../models/message';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  _id: string;
  post: Post;
  messages: Message[];
  message: Message;
  reply = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService,
    private flashMessages: FlashMessagesService
  ) { }

  ngOnInit() {
    this._id = this.route.snapshot.params['id'];

    this.postService.getPost(this._id).subscribe(data => {
      this.post = data.obj;
      this.messages = data.obj.message;
    });
  }

  onSubmit({ value, valid }: { value: Message, valid: boolean }) {
    if (!valid) {
      this.flashMessages.show('Please enter a valid message', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    this.postService.newMessage(value, this._id).subscribe(data => {
      console.log(data);
    });
  }

  scroll(el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
