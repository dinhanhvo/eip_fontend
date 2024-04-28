import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NodeFilterPipe } from './shared';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [NodeFilterPipe],
  declarations: [
    NodeFilterPipe]
})
export class CommonPipeModule { }
