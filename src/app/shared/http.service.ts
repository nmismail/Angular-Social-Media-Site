import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { AWSCreds } from './aws-creds';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  })
};


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private url = 'http://ec2-13-58-242-160.us-east-2.compute.amazonaws.com:8080/Chordination/';
 // private url = 'http://localhost:9005/ChordSpring/';
  private s3PictureFolder = 'photos/';
  private bucketUrl = 'https://console.aws.amazon.com/s3/buckets/chordination/';

  private bucket = new S3(
    {
      accessKeyId: AWSCreds.accessKeyId,
      secretAccessKey: AWSCreds.secretAccessKey,
      region: AWSCreds.region
    }
  );

  constructor(private http: HttpClient) { }

  public loginUser(inEmail: string, inPassword: string): Observable<string> {
    const path = this.url.concat('login.chord');
    return this.http.post(path, { email: inEmail, password: inPassword }, httpOptions).pipe(map(resp => resp as string));
  }

  public registerUser(firstname, lastname, email, dob, password, genreOne, genreTwo, genreThree) {
    const params = {
      firstname: firstname, lastname: lastname, email: email,
      dob: dob, password: password, genreOne: genreOne, genreTwo: genreTwo, genreThree: genreThree
    };
    return this.http.get(this.url.concat('/createUser.chord'), { params: params });
  }

  public getUserPosts(userId) {
    const path = this.url.concat('getUserPosts.chord');
    const params = { userId: userId };
    return this.http.get(path, { params: params });
  }

  public createPost(authorId, message, picture) {
    const params = { userId: authorId, message: message, picture: picture };
    return this.http.get(this.url.concat('createPost.chord'), { params: params });
  }

  public getUserFeed(userId) {
    const path = this.url.concat('getUserFeed.chord');
    const params = { userId: userId };
    return this.http.get(path, { params: params });
  }

  public searchUsers(name: string): Observable<string> {
    console.log('searching for ' + name);
    const path = this.url.concat('searchUserByName.chord');
    const params = { name: name };
    return this.http.get(path, { params: params }).pipe(map(resp => resp as string));
  }

  public getUserById(userId) {
    const path = this.url.concat('getUser.chord');
    const params = { userId: userId };
    return this.http.get(path, { params: params }).pipe(map(resp => resp as string));
  }

  public updateUser(user): Observable<string> {
    const path = this.url.concat('updateUser.chord');
    const params = {
      userId: user.userId, email: user.email, dob: user.dob, bio: user.bio, picture: user.picture,
      genreOne: user.genreOne, genreTwo: user.genreTwo, genreThree: user.genreThree
    };
    return this.http.get(path, { params: params }).pipe(map(resp => resp as string));
  }

  public updatePassword(user): Observable<string> {
    const path = this.url.concat('changePassword.chord');
    const params = {
      userId: user.userId, newPassword: user.password
    };
    return this.http.get(path, { params: params }).pipe(map(resp => resp as string));
  }

  public resetPassword(email) {
    const params = { email: email };
    return this.http.get(this.url.concat('forgetPassword.chord'), { params: params });
  }

  public uploadPicture(picture: File, callback?: (err, data) => void) {

    const params = {
      Bucket: 'chordination',
      Key: this.s3PictureFolder + picture.name,
      Body: picture
    };

    this.bucket.upload(params, callback);
  }

  public likePost(userId, postId): Observable<string> {
    const path = this.url.concat('likePost.chord');
    const params = { userId: userId, postId: postId };
    return this.http.get(path, { params: params }).pipe(map(resp => resp as string));
  }
}
