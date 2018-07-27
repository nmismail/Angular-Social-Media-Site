import { Component, OnInit } from '@angular/core';
import { SpotifyServiceService } from '../shared/spotify-service.service';


@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.css']
})
export class SpotifyComponent implements OnInit {

  constructor(private spotify: SpotifyServiceService) { }

  ngOnInit() {

  }



  click() {
    const iframe = ((document.getElementById('iframe') as HTMLInputElement).style.visibility = 'visible');
    const button = ((document.getElementById('btn') as HTMLInputElement).style.visibility = 'hidden');

  }
}
