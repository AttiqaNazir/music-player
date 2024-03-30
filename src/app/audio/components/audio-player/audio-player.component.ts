import { Component, OnInit } from '@angular/core';
import { Track } from '../../types/domain';
import { AudioService } from '../../services/audio-service.service';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss'],
})
export class AudioPlayerComponent implements OnInit {
  currentTrack!: Track;
  isPlaying: boolean = false;

  constructor(private audioService: AudioService) {}

  ngOnInit() {
    this.audioService.setTracks(this.audioService.getSongsData());
    this.currentTrack = this.audioService.getCurrentTrack();
  }

  playPause() {
    if (this.isPlaying) {
      this.audioService.pause();
    } else {
      this.audioService.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  nextTrack() {
    this.audioService.nextTrack();
    this.currentTrack = this.audioService.getCurrentTrack();
    this.isPlaying = true;
  }

  previousTrack() {
    this.audioService.previousTrack();
    this.currentTrack = this.audioService.getCurrentTrack();
    this.isPlaying = true;
  }

  stop() {
    this.audioService.stop();
    this.isPlaying = false;
  }
}
