import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { Track, TrackResponse } from '../types/domain';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  public audio: HTMLAudioElement = new Audio();
  public isPlaying: boolean = false;
  public currentTrackIndex: number = 0;

  private tracks: Track[] = [];
  private playbackPosition = 0;

  constructor(private http: HttpClient) {
    this.audio.addEventListener('ended', () => {
      this.nextTrack();
    });
  }

  setTracks(tracks: Track[]) {
    this.tracks = [...tracks];
  }

  fetchTracks(): Observable<Track[]> {
    return this.http
      .get<TrackResponse>('http://localhost:4200/assets/mockdata.json')
      .pipe(
        map(({ response }: TrackResponse) => {
          return response.map((item) => ({
            ...item,
          }));
        }),
        catchError((error) =>
          throwError(() => new Error(error.message ?? 'Something went wrong')),
        ),
      );
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
      this.audio.currentTime = 0;
      this.audio.src = this.getCurrentTrack().url;
      this.play();
    }
  }

  public previousTrack() {
    if (this.currentTrackIndex > 0) {
      this.currentTrackIndex--;
      this.audio.currentTime = 0;
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
