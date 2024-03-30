import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AudioRoutingModule } from './audio-routing.module';
import { AudioPlayerComponent } from './components/audio-player/audio-player.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";

@NgModule({
  declarations: [AudioPlayerComponent],
  imports: [CommonModule, AudioRoutingModule, MatProgressBarModule],
})
export class AudioModule {}
