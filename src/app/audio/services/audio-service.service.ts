import { Injectable } from '@angular/core';
import { Track } from '../types/domain';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  audio: HTMLAudioElement = new Audio();
  tracks: Track[] = [];
  currentTrackIndex: number = 0;

  constructor() {
    this.audio.addEventListener('ended', () => {
      this.nextTrack();
    });
  }

  setTracks(tracks: Track[]) {
    this.tracks = tracks;
  }

  getCurrentTrack(): Track {
    return this.tracks[this.currentTrackIndex];
  }

  play(): void {
    if (this.audio.paused) {
      this.audio.src = this.getCurrentTrack().url;
      this.audio.play();
    }
  }

  pause() {
    if (!this.audio.paused) {
      this.audio.pause();
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

  public getSongsData(): Track[] {
    return [
      {
        url: 'https://ia801504.us.archive.org/3/items/EdSheeranPerfectOfficialMusicVideoListenVid.com/Ed_Sheeran_-_Perfect_Official_Music_Video%5BListenVid.com%5D.mp3',
        songName: 'Perfect',
        artistName: 'Ed Sheeran',
        coverArt: "assets/Ed-Sheeran.jpg",
      },

      {
        url: 'https://ia801609.us.archive.org/16/items/nusratcollection_20170414_0953/Man%20Atkiya%20Beparwah%20De%20Naal%20Nusrat%20Fateh%20Ali%20Khan.mp3',
        songName: 'Man Atkeya Beparwah',
        artistName: 'Nusrat Fateh Ali Khan',
        coverArt: "assets/Ed-Sheeran.jpg",
      },
      {
        url: 'https://ia801503.us.archive.org/15/items/TheBeatlesPennyLane_201805/The%20Beatles%20-%20Penny%20Lane.mp3',
        songName: 'Penny Lane',
        artistName: 'The Beatles',
        coverArt: "assets/Ed-Sheeran.jpg",
      },
    ];
  }
}
