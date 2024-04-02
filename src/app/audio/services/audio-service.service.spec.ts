import { TestBed } from '@angular/core/testing';

import { AudioService } from './audio-service.service';
import { Track } from '../types/domain';
import { tracks } from '../fixtures/tracks';

describe('AudioServiceService', () => {
  let service: AudioService;
  let testTracks: Track[];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AudioService);
    testTracks = tracks;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get tracks successfully', () => {
    service['setTracks'](testTracks);

    expect(service.getTracks()).toEqual(testTracks);
  });

  it('should return current track correctly', () => {
    service['setTracks'](testTracks);
    expect(service.getCurrentTrack()).toEqual(testTracks[0]);
  });

  it('should chck if it is the last track', () => {
    service['setTracks'](testTracks);
    expect(service.checkIfLastTrack()).toBe(false);
  });

  it('should check if it is the first track', () => {
    service['setTracks'](testTracks);
    expect(service.checkIfFirstTrack()).toBe(true); // Assuming it's the first track
  });

  it('should play the audio', () => {
    spyOn(service.audio, 'play');
    service.play();
    expect(service.audio.src).toEqual(service.getCurrentTrack().url);
    expect(service.audio.play).toHaveBeenCalled();
  });

  it('should play the  next track', () => {
    spyOn(service.audio, 'play');
    service['setTracks'](testTracks);
    const initialIndex = service.currentTrackIndex;
    service.nextTrack();
    expect(service.currentTrackIndex).toBe(initialIndex + 1);
    expect(service.audio.src).toBe(service.getCurrentTrack().url);
    expect(service.audio.play).toHaveBeenCalled();
  });

  it('should play the previous track', () => {
    spyOn(service.audio, 'play');
    service.currentTrackIndex = 1;
    const initialIndex = service.currentTrackIndex;
    service.previousTrack();
    expect(service.currentTrackIndex).toBe(initialIndex - 1);
    expect(service.audio.src).toEqual(service.getCurrentTrack().url);
    expect(service.audio.play).toHaveBeenCalled();
  });
});
