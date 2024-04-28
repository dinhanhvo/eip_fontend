import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplitComponent } from './split/split.component';
import { SplitAreaDirective } from './directive/split-area.directive';
import { SplitGutterDirective } from './directive/split-gutter.directive';
import { DomChangeDirective } from './directive/dom-change.directive';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SplitComponent,
    SplitAreaDirective,
    SplitGutterDirective,
    DomChangeDirective
  ],
  exports: [
    SplitComponent,
    SplitAreaDirective,
    DomChangeDirective
  ]
})
export class SplitterModule { }
