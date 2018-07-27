import { Component, OnInit } from '@angular/core';
import { User } from '../shared/User';
import { HttpService } from '../shared/http.service';
import { Post } from '../shared/post';
import swal from 'sweetalert2';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  static newPostPic: string;

  user: User;
  post: Post;

  private posts: Post[];
  isActive: boolean;
  // users: User[] = [];

  constructor(private http: HttpService, public router: Router) {

  }

  ngOnInit() {
    this.post = {
      author: null, description: null, picture: null, submitTime: null, id: null, likedUsers: null
    };
    const userJSON = sessionStorage.getItem('user');
    this.user = JSON.parse(userJSON);
    this.http.getUserFeed(this.user.userId).subscribe(data => this.parsePosts(data));
  }

  parsePosts(data) {
    this.posts = data;
    this.posts.sort((a, b) => new Date(b.submitTime).getTime() - new Date(a.submitTime).getTime());
    console.log(this.posts);
    console.log(new Date(1532262399553));
  }

  getDate(inDate: number) {
    const date = new Date(inDate);
    return date;
    /*     return date.getHours() + 1; */

  }

  savePost() {
    const post = ((document.getElementById('savePost') as HTMLInputElement).value);
    swal('Success!', 'Post has been created', 'success');
    setTimeout((router: Router) => {
      this.router.navigate(['/home/feed']);
  }, 2000);
    this.post = {
      author: this.user, description: this.post.description, picture: FeedComponent.newPostPic, submitTime: null, id: null, likedUsers: null
    };

    this.http.createPost(this.post.author.userId, this.post.description, this.post.picture).subscribe(data => this.parsePost(data));
  }

  parsePost(postJSON) {
    this.post = {
      author: this.user, description: postJSON.description, picture: postJSON.picture, submitTime: null, id: null, likedUsers: null
    };
  }

  createPost() {
    this.isActive = true;
  }

  cancelPost() {
    this.isActive = false;
  }

  postLikedByUser(post: Post): boolean {

    for (const user of post.likedUsers) {
      if (user.userId === this.user.userId) {
        return true;
      }
    }
    return false;
  }

  likePost(postId) {
    this.http.likePost(this.user.userId, postId).subscribe(resp => this.handleLikedPost(resp));
  }

  handleLikedPost(postJSON) {
    location.reload();
  }

  selectPostPic(event) {
    let picture: File;
    picture = event.target.files[0];
    this.http.uploadPicture(picture, this.handlePicUpload);
  }

  handlePicUpload(err, data) {
    if (err) {
      console.log('There was an error uploading the picture: ', err);
    } else {
      console.log(data);
      FeedComponent.newPostPic = data.Location;
      alert('File uploaded!');
    }
  }
}
