import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AudioRoutingModule } from './audio-routing.module';
import { AudioPlayerComponent } from './components/audio-player/audio-player.component';

@NgModule({
  declarations: [AudioPlayerComponent],
  imports: [CommonModule, AudioRoutingModule],
})
export class AudioModule {}
