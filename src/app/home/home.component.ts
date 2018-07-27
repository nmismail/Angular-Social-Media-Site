import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private user: User;

  constructor(private router: Router) { }

  ngOnInit() {
     this.user = JSON.parse(sessionStorage.getItem('user'));

  }

  clickedLogout() {
    sessionStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  redirect() {
    this.router.navigate(['/home/profile', this.user.userId]);
  }
}
