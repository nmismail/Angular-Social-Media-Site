import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../login/login.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { HomeComponent } from '../home/home.component';
import { RegisterComponent } from '../register/register.component';
import { ProfileComponent } from '../profile/profile.component';
import { FeedComponent } from '../feed/feed.component';
import { FriendsComponent } from '../friends/friends.component';
import { SpotifyComponent } from '../spotify/spotify.component';
import { AuthGaurdService } from '../shared/auth-gaurd.service';
import { SpotifyServiceService} from '../shared/spotify-service.service';
import { UpdateProfileComponent } from '../update-profile/update-profile.component';



const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGaurdService],

  children:
  [{ path: 'feed', component: FeedComponent, canActivate: [AuthGaurdService] },
  { path: 'profile/:userId', component: ProfileComponent, canActivate: [AuthGaurdService] },
  { path: 'update-profile', component: UpdateProfileComponent, canActivate: [AuthGaurdService] },
  { path: 'friends', component: FriendsComponent, canActivate: [AuthGaurdService] },
  { path: 'spotify', component: SpotifyComponent, canActivate: [AuthGaurdService] },
  { path: '', redirectTo: '/home/feed', pathMatch: 'full' },
] },

 { path: '**', redirectTo: '/login', pathMatch: 'full' }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
