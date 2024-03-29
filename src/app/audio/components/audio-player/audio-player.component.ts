import { Component, OnInit } from '@angular/core';
import { Track } from '../../types/domain';
import { AudioService } from '../../services/audio-service.service';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss'],
})
export class AudioPlayerComponent implements OnInit {
  private audioTrack: Track[] = [];

  constructor(private audioService: AudioService) {}

  ngOnInit() {
    this.audioTrack = this.audioService.getSongsData();
  }
}
