import { Component, OnInit } from '@angular/core';

import { Track } from '../../types/domain';
import { AudioService } from '../../services/audio-service.service';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss'],
})
export class AudioPlayerComponent implements OnInit {
  public currentTrack: Track | null = null;
  public currentTrackIndex: number = 0;
  public isPlaying: boolean = false;
  public isFirstTrack: boolean = true;
  public isLastTrack: boolean = false;
  public progress: number = 0;
  public songs: Track[] = [];

  constructor(private audioService: AudioService) {}

  ngOnInit() {
    this.audioService.fetchTracks().subscribe({
      next: (v) => {
        this.audioService.setTracks(v);
        this.songs = [...v];
        this.currentTrack = this.audioService.getCurrentTrack();
        this.currentTrackIndex = this.audioService.currentTrackIndex;
        this.audioService.audio.addEventListener('timeupdate', () => {
          this.updateProgress();
        });
      },
      error: (e) => console.error(e.message),
    });
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
    this.isFirstTrack = this.audioService.checkIfFirstTrack();
    this.isLastTrack = this.audioService.checkIfLastTrack();
  }

  previousTrack() {
    this.audioService.previousTrack();
    this.currentTrack = this.audioService.getCurrentTrack();
    this.isPlaying = true;
    this.isFirstTrack = this.audioService.checkIfFirstTrack();
    this.isLastTrack = this.audioService.checkIfLastTrack();
  }

  stop() {
    this.audioService.stop();
    this.isPlaying = false;
  }

  public playSong(song: Track, index: number) {
    this.audioService.currentTrackIndex = index;
    this.updateTrackInfo();
    this.stop();
    this.playPause();
  }

  private updateTrackInfo() {
    this.currentTrack = this.audioService.getCurrentTrack();
    this.currentTrackIndex = this.audioService.currentTrackIndex;
    this.isPlaying = true;
    this.isFirstTrack = this.audioService.checkIfFirstTrack();
    this.isLastTrack = this.audioService.checkIfLastTrack();
  }

  updateProgress() {
    const audio = this.audioService.audio;
    const duration = audio.duration;
    const currentTime = audio.currentTime;
    this.progress = (currentTime / duration) * 100;
  }

  seek(event: MouseEvent) {
    const progressBar = event.target as HTMLDivElement;
    const rect = progressBar.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const progressBarWidth = progressBar.clientWidth;
    const seekPercentage = offsetX / progressBarWidth;

    const audio = this.audioService.audio;
    if (isFinite(audio.duration)) {
      audio.currentTime = audio.duration * seekPercentage;
    }
  }
}
