import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { Message } from '../../../models/message';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-edit-message',
  templateUrl: './edit-message.component.html',
  styleUrls: ['./edit-message.component.css']
})
export class EditMessageComponent implements OnInit {
  postId: string;
  messageId: string;
  message: Message;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService,
    private flashMessages: FlashMessagesService
  ) { }

  ngOnInit() {
    this.postId = this.route.snapshot.params['id'];
    this.messageId = this.route.snapshot.params['id '];
    this.postService.getMessage(this.messageId).subscribe(newData => {
      this.message = newData.obj;
      console.log(this.message);
    });
  }

  onSubmit({ value, valid }: { value: Message, valid: boolean }) {
    if (!valid) {
      this.flashMessages.show('Please enter a valid message', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    this.message.content = value.content;
    console.log(this.message);
    this.postService.editMessage(this.message).subscribe(data => {
      this.flashMessages.show('Your message was successfully edited', { cssClass: 'alert-success', timeout: 3000 });
      this.router.navigate(['post/' + this.postId]);
    });
  }
}
