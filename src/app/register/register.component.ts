import { Component, OnInit } from '@angular/core';
import { Register } from '../models/register';
import { HttpService } from '../shared/http.service';
import swal from 'sweetalert2';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private firstname;
  private lastname;
  private email;
  private dob;
  private password;
  private confirm;
  private genreOne;
  private genreTwo;
  private genreThree;
  constructor(private http: HttpService, public router: Router) { }

  ngOnInit() {
  }

  clickedRegister() {
    // const register = document.getElementById('text_field1').valueOf;
    // const lengthRegister = register.valueOf.length;
    //  const register = (<HTMLInputElement>document.getElementById('text_field1')).value;
    // const register: NodeListOf<Element> = document.getElementsByClassName('register');
    const register = ((document.getElementById('text_field1') as HTMLInputElement).value);
    const register1 = ((document.getElementById('text_field2') as HTMLInputElement).value);
    const register2 = ((document.getElementById('text_field3') as HTMLInputElement).value);
    const register3 = ((document.getElementById('text_field4') as HTMLInputElement).value);
    const register4 = ((document.getElementById('text_field5') as HTMLInputElement).value);
    const register5 = ((document.getElementById('text_field6') as HTMLInputElement).value);
    const register6 = ((document.getElementById('text_field7') as HTMLInputElement).value);

    if (register.length === 0) {
      console.log(register.length);
      swal('Warning!', 'There appears to be some empty fields', 'error');
    } else if (register1.length === 0) {
      console.log(register1.length);
      swal('Warning!', 'There appears to be some empty fields', 'error');
    } else if (register2.length === 0) {
      console.log(register2.length);
      swal('Warning!', 'There appears to be some empty fields', 'error');
    } else if (register3.length === 0) {
      console.log(register3.length);
      swal('Warning!', 'There appears to be some empty fields', 'error');
    } else if (register4.length === 0) {
      console.log(register4.length);
      swal('Warning!', 'There appears to be some empty fields', 'error');
    } else if (register5.length === 0) {
      console.log(register5.length);
      swal('Warning!', 'There appears to be some empty fields', 'error');
    } else if (register6.length === 0) {
      console.log(register6.length);
      swal('Warning!', 'There appears to be some empty fields', 'error');
    } else if (register4 !== register5) {
      swal('Warning!', 'The passwords entered don\'t match!', 'error');
    } else {
      this.http.registerUser(this.firstname, this.lastname, this.email, this.dob, this.password, this.genreOne,
        this.genreTwo, this.genreThree).subscribe(data => this.parseResponse(data));
    }
  }

  // (register.valueOf.length !== 0)

  parseResponse(response) {
    console.log(response);

    if (response.status === 'ok') {

      swal('Success', 'Registration complete', 'success');

      setTimeout((router: Router) => {
        this.router.navigate(['/login']);
      }, 2000);
    } else if (response.status === 'email taken') {
      swal('Error', 'Email is already associated with an account', 'warning');
    } else {
      swal('Error', 'Something went horribly wrong!', 'warning');
    }
  }
}
