import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class SpotifyServiceService {
  private searchUrl: string;
  private client_id = '5cd303096b76455a8ce34b6f1b5f5bec';
  private client_secret = 'ea5fa67ec2054e4086fa558f8d3452c8';
  private accessToken: any;
  private tokenType: string;

  constructor(private http: Http) {

  }



  // getToken() {
  //   const params = ('grant_type=client_credentials');
  //   const headers = new Headers();
  //   headers.append('Authorization', 'Basic ' + this.encoded);
  //   headers.append('Content-Type' , 'application/x-www-form-urlencoded');

  //   return this.http.post('https://accounts.spotify.com/api/token', params , {headers : headers} )
  //   .pipe(map(res => res.json()));
  // }

  // searchMusic(str: string, type= 'artist') {
  //   console.log(this.encoded);
  //   this.searchUrl = 'https://api.spotify.com/v1/search?query=' + str + '&offset=0&limit=50&type=' + type;
  //   const headers = new Headers();
  //   headers.append('Authorization' , 'Bearer ' + this.access_token);
  //   return this.http.get(this.searchUrl , {headers : headers})
  //   .pipe(map((res: Response) => res.json()));
  //  // return this.http.get(this.searchUrl).pipe(map(res => res.json()));
  // }
}
