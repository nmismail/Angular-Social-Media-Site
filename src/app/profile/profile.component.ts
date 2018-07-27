import { Component, OnInit } from '@angular/core';

import { User } from '../shared/user';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../shared/http.service';
import { Post } from '../shared/post';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  posts: Post[];
  isMyProfile: boolean;

  constructor(private route: ActivatedRoute, private httpService: HttpService) {
    this.route.params.subscribe(params => this.changeDisplayedProfile(params));
  }

  ngOnInit() {
    const userId = Number(this.route.snapshot.paramMap.get('userId'));
    this.isMyProfile = (userId === JSON.parse(sessionStorage.getItem('user')).userId);
    this.httpService.getUserById(userId)
      .subscribe(user => this.parseUser(user));
    this.httpService.getUserPosts(userId).subscribe(data => this.parsePosts(data));
  }

  parseUser(user) {
    this.user = user;
  }

  parsePosts(data) {
    this.posts = data;
    this.posts.sort((a, b) => new Date(b.submitTime).getTime() - new Date(a.submitTime).getTime());
  }

  getDate(inDate: number) {
    const date = new Date(inDate);
    return date;
    /*     return date.getHours() + 1; */

  }

  changeDisplayedProfile(params) {
    this.ngOnInit();
  }
}
