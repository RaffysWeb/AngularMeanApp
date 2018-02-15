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
  user: string;
  post: Post;
  messages: Message[];
  message: Message;
  reply = false;
  edit = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService,
    private flashMessages: FlashMessagesService
  ) { }

  ngOnInit() {
    this._id = this.route.snapshot.params['id'];
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getMessages();
  }

  onSubmit({ value, valid }: { value: Message, valid: boolean }) {
    if (!valid) {
      this.flashMessages.show('Please enter a valid message', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    this.postService.newMessage(value, this._id).subscribe(data => {
      this.flashMessages.show('New message added', { cssClass: 'alert-success', timeout: 3000 });
      this.getMessages();
    });

    this.reply = false;
    this.message = null;
  }

  onDelete(message) {
    this.postService.deleteMessage(message)
      .subscribe(result => {
        this.getMessages();
        this.flashMessages.show('Message deleted', { cssClass: 'alert-success', timeout: 3000 });
      });
  }

  onEdit(message) {
    this.edit = !this.edit;
    console.log(message);
  }

  getMessages() {
    this.postService.getPost(this._id).subscribe(newData => {
      this.post = newData.obj;
      this.messages = newData.obj.message;
      return this.user;
    });
  }


  scroll(el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
