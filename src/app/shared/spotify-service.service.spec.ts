import { TestBed, inject } from '@angular/core/testing';

import { SpotifyServiceService } from './spotify-service.service';

describe('SpotifyServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpotifyServiceService]
    });
  });

  it('should be created', inject([SpotifyServiceService], (service: SpotifyServiceService) => {
    expect(service).toBeTruthy();
  }));
});
