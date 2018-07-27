import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { User } from '../shared/user';
import { Router } from '@angular/router';
import swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private email: string;
  private password: string;

  constructor(private chordApi: HttpService, private router: Router) { }

  public clickedLogin () {
    const email = ((document.getElementById('email') as HTMLInputElement).value);
    const password = ((document.getElementById('password') as HTMLInputElement).value);
    if (email.length === 0) {
      console.log(email.length);
      swal('Warning!', 'There appears to be some empty fields', 'error');
     } else if (password.length === 0) {
      console.log(password.length);
      swal('Warning!', 'There appears to be some empty fields', 'error');
     } else {
    this.chordApi.loginUser(this.email, this.password).subscribe(data => this.parseUser(data));
  }
}

  parseUser(userJSON) {
    console.log(userJSON);

    if (userJSON == null) {
      swal('Warning', 'Invalid email/password', 'warning');
    } else {
      const user: User = {userId: userJSON.userId, firstname: userJSON.firstname, lastname: userJSON.lastname,
        email: userJSON.email, dob: userJSON.dob, password: userJSON.password, genreOne: userJSON.genreOne,
        genreTwo: userJSON.genreTwo, genreThree: userJSON.genreThree, picture: userJSON.picture,
        bio: userJSON.bio};
      sessionStorage.setItem('user', JSON.stringify(user));
      console.log(sessionStorage.getItem('user'));
      this.router.navigate(['/home']);
    }
  }
  ngOnInit() {
  }

}
