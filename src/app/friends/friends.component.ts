import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user';
import { HttpService } from '../shared/http.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent {
  user: User;
  users: User[];

  constructor(private httpService: HttpService) { }
  search(name: string): void {
    this.httpService.searchUsers(name)
      .subscribe(users => this.searchUsers(users));
  }
  searchUsers(users) {
    this.users = users;
  }
}
