import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared/http.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  email: string;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
  }

  public resetPassword() {
    const forgot = ((document.getElementById('email') as HTMLInputElement).value);
    if (forgot.length === 0) {
      swal('Warning', 'Email seems to be incorrect or field is empty', 'warning');
    } else {
      swal('Success', 'Password has been reset, please check email', 'success');
    this.httpService.resetPassword(this.email).subscribe(data => this.parseData(data));
  }
}
  parseData(email) {
      this.email = email;
  }
}
