import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../../services/validate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = {
    name: undefined,
    username: undefined,
    email: undefined,
    password: undefined
  };

  constructor(
    private flashMessages: FlashMessagesService,
    private validateService: ValidateService,
  ) { }


  ngOnInit() {
  }


  onRegisterSubmit({ value, valid }: { value: User, valid: boolean }) {
    if (!valid) {
      this.flashMessages.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    if (!this.validateService.validateEmail(value.email)) {
      this.flashMessages.show('Please enter a valid email address', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    console.log(value);
  }

}
