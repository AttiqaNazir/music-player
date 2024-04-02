import { Injectable } from '@angular/core';
import { Track } from '../types/domain';
import { tracks } from '../fixtures/tracks';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  public audio: HTMLAudioElement = new Audio();
  public isPlaying: boolean = false;
  public currentTrackIndex: number = 0;

  private tracks: Track[] = [];
  private playbackPosition = 0;

  constructor() {
    this.tracks.push(...tracks);
    this.audio.addEventListener('ended', () => {
      this.nextTrack();
    });
  }

  private setTracks(tracks: Track[]) {
    this.tracks = tracks;
  }

  public getTracks() {
    return this.tracks;
  }

  public getCurrentTrack(): Track {
    return this.tracks[this.currentTrackIndex];
  }

  public checkIfLastTrack(): boolean {
    return this.currentTrackIndex === this.tracks.length - 1;
  }

  public checkIfFirstTrack(): boolean {
    return this.currentTrackIndex === 0;
  }

  public play(): void {
    if (this.audio.paused) {
      this.audio.src = this.getCurrentTrack().url;

      this.audio.currentTime = this.playbackPosition;
      this.audio.play();
    }
  }

  public pause() {
    if (!this.audio.paused) {
      this.audio.pause();
      this.playbackPosition = this.audio.currentTime;
    }
  }

  public nextTrack() {
    if (this.currentTrackIndex < this.tracks.length - 1) {
      this.currentTrackIndex++;
      this.audio.src = this.getCurrentTrack().url;
      this.play();
    }
  }

  public previousTrack() {
    if (this.currentTrackIndex > 0) {
      this.currentTrackIndex--;
      this.audio.src = this.getCurrentTrack().url;
      this.play();
    }
  }

  public stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.playbackPosition = 0;
  }
}
