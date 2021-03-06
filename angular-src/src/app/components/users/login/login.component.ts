import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = {
    name: undefined,
    username: undefined,
    email: undefined,
    password: undefined
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessages: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onLoginSubmit({ value, valid }: { value: User, valid: boolean }) {
    this.authService.authenticateUser(value).subscribe(data => {
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.flashMessages.show('You are now logged in', { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/']);
      } else {
        this.flashMessages.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/login']);
      }
    });
  }

}
