import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';

import { CokhihomeRoutingModule } from './cokhihome-routing.module';
import { CokhihomeComponent } from './cokhihome.component';
import { CokhimainComponent } from './cokhimain/cokhimain.component';
import { ProductsComponent } from '../components/products/products.component';
import { ProductsdetailComponent } from '../components/productsdetail/productsdetail.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ProductsHomeComponent } from './products-home/products-home.component';
// import { CarouselComponent } from '../admin/comps/carousel/carousel.component'

@NgModule({
  declarations: [CokhihomeComponent, CokhimainComponent,
    ProductsComponent, ProductsdetailComponent,
    ContactusComponent,
    ProductsHomeComponent],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    CarouselModule,
    CalendarModule,
    CokhihomeRoutingModule
  ]
})
export class CokhihomeModule { }
