import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { HttpModule } from '@angular/http';
import { FeedComponent } from './feed/feed.component';
import { FriendsComponent } from './friends/friends.component';
import { SpotifyComponent } from './spotify/spotify.component';
import { AuthService } from './shared/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthGaurdService } from './shared/auth-gaurd.service';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { SpotifyServiceService } from './shared/spotify-service.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ForgotPasswordComponent,
    RegisterComponent,
    ProfileComponent,
    FeedComponent,
    FriendsComponent,
    SpotifyComponent,
    UpdateProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, HttpClientModule, AuthGaurdService, SpotifyServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
