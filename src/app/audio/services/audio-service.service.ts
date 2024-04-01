import { Injectable } from '@angular/core';
import { Track } from '../types/domain';
import { tracks } from '../fixtures/tracks';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  public audio: HTMLAudioElement = new Audio();
  private tracks: Track[] = [];
  private currentTrackIndex: number = 0;
  private isPlaying = false;
  private playbackPosition = 0;

  constructor() {
    this.tracks.push(...tracks);
    this.audio.addEventListener('ended', () => {
      this.nextTrack();
    });
  }

  setTracks(tracks: Track[]) {
    this.tracks = tracks;
  }

  public getTracks() {
    return this.tracks;
  }

  getCurrentTrack(): Track {
    return this.tracks[this.currentTrackIndex];
  }

  checkIfLastTrack(): boolean {
    return this.currentTrackIndex === this.tracks.length - 1;
  }

  checkIfFirstTrack(): boolean {
    return this.currentTrackIndex === 0;
  }

  play(): void {
    if (this.audio.paused) {
      this.audio.src = this.getCurrentTrack().url;

      this.audio.currentTime = this.playbackPosition;
      this.audio.play();
      this.isPlaying = true;
    }
  }

  pause() {
    if (!this.audio.paused) {
      this.audio.pause();
      this.isPlaying = false;
      this.playbackPosition = this.audio.currentTime;
    }
  }

  nextTrack() {
    if (this.currentTrackIndex < this.tracks.length - 1) {
      this.currentTrackIndex++;
      this.audio.src = this.getCurrentTrack().url;
      this.play();
    }
  }

  previousTrack() {
    if (this.currentTrackIndex > 0) {
      this.currentTrackIndex--;
      this.audio.src = this.getCurrentTrack().url;
      this.play();
    }
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }
}
