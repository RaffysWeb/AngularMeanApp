import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/users/login/login.component';
import { RegisterComponent } from './components/users/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { AddMessageComponent } from './components/messages/add-message/add-message.component';
import { EditMessageComponent } from './components/messages/edit-message/edit-message.component';
import { AddPostComponent } from './components/posts/add-post/add-post.component';
import { EditPostComponent } from './components/posts/edit-post/edit-post.component';
import { PostService } from './services/post.service';
import { PostComponent } from './components/posts/post/post.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'new-post', component: AddPostComponent},
  { path: 'post/:id', component: PostComponent},
  { path: 'post/:id/message/:id ', component: EditMessageComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    AddMessageComponent,
    EditMessageComponent,
    AddPostComponent,
    EditPostComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [
    ValidateService,
    AuthService,
    PostService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
