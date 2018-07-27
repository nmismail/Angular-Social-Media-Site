import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { User } from '../shared/user';
import { Router } from '@angular/router';
import swal from 'sweetalert2';


@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  password: string;
  passwordConfirm: string;
  user: User;
  newPicture: File;

  constructor(private chordApi: HttpService, private router: Router) { }

  public saveUser() {
    const save = ((document.getElementById('saveUser') as HTMLInputElement).value);
    swal('Success!', 'Profile edits applied', 'success');
    setTimeout((router: Router) => {
      this.router.navigate(['/home/profile', this.user.userId]);
  }, 2000);

    this.user.picture = JSON.parse(sessionStorage.getItem('user')).picture;
    this.chordApi.updateUser(this.user).subscribe(data => this.parseUser(data));
  }

  parseUser(userJSON) {
    console.log(userJSON);

    this.user = {
      userId: userJSON.userId, firstname: userJSON.firstname, lastname: userJSON.lastname,
      email: userJSON.email, dob: userJSON.dob, password: userJSON.password, genreOne: userJSON.genreOne,
      genreTwo: userJSON.genreTwo, genreThree: userJSON.genreThree, picture: userJSON.picture,
      bio: userJSON.bio
    };

    sessionStorage.setItem('user', JSON.stringify(this.user));
    this.user = JSON.parse(sessionStorage.getItem('user'));
    console.log(sessionStorage.getItem('user'));
    this.router.navigate(['home/profile', this.user.userId]);
  }
  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
  }

  selectedPicture(event) {
    this.newPicture = event.target.files[0];
    console.log(this.newPicture);
    this.chordApi.uploadPicture(this.newPicture, this.handlePicChng);
  }

  private handlePicChng(err, data) {
    if (err) {
      console.log('There was an error uploading the picture: ', err);
    } else {
      console.log(data);

      const user: User = JSON.parse(sessionStorage.getItem('user'));
      user.picture = data.Location;

      sessionStorage.setItem('user', JSON.stringify(user));
      swal('Success', 'Picture uploaded!', 'success');
    }
  }

  changePassword() {
    document.getElementById('changePasswordThing').style.display = 'block';
  }

  cancel() {
    document.getElementById('changePasswordThing').style.display = 'none';
  }

  savePassword() {
    if (this.password !== this.passwordConfirm) {
      swal('Warning', 'Passwords must match', 'warning');
    } else {
    this.user.password = this.password;
    this.user.picture = JSON.parse(sessionStorage.getItem('user')).picture;
    this.chordApi.updatePassword(this.user).subscribe(data => this.parseUser(data));
    document.getElementById('changePasswordThing').style.display = 'none';
    swal('Success', 'Password has been changed', 'success');
    }
  }
}
