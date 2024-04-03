import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AudioRoutingModule } from './audio-routing.module';
import { AudioPlayerComponent } from './components/audio-player/audio-player.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
@NgModule({
  declarations: [AudioPlayerComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    AudioRoutingModule,
    MatProgressBarModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
  ],
})
export class AudioModule {}
