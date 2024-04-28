import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileUploadModule} from 'primeng/fileupload';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

// For MDB Angular Free
import { CarouselModule, WavesModule } from 'angular-bootstrap-md';
import { CarouselComponent } from './comps/carousel/carousel.component'

@NgModule({
  declarations: [AdminComponent, CarouselComponent],
  imports: [
    CommonModule,
    FileUploadModule,
    AdminRoutingModule,
    CarouselModule,
    WavesModule
  ]
})
export class AdminModule { }
