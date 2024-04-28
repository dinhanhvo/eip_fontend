import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// translate
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment as env } from '../../environments/environment';

import { CokhiRoutingModule } from './cokhi-routing.module';
import { CokhiComponent } from './cokhi.component';
import { CokhimenuComponent } from './components/cokhimenu/cokhimenu.component';
import { CokhifooterComponent } from './components/cokhifooter/cokhifooter.component';
import { CokhiheaderComponent } from './components/cokhiheader/cokhiheader.component';
import { Carousel1Component } from './components/carousel1/carousel1.component';
// import { AdminComponent } from './admin/admin.component';
// import { ProductsdetailComponent } from './components/productsdetail/productsdetail.component';
// import { ProductsComponent } from './components/products/products.component';
// import { CarouselComponent } from './admin/comps/carousel/carousel.component';

// import { CarouselModule, WavesModule } from 'angular-bootstrap-md';
import { CarouselModule } from 'primeng/carousel';

import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TestmainComponent } from './test/testmain/testmain.component';
import { NhixuanComponent } from './nhixuan/nhixuan.component';

export const createTranslateLoader = (http: HttpClient) => {
  return new TranslateHttpLoader(http, env.contextPath + '/assets/i18n/cokhi/', '.json');
};

@NgModule({
  declarations: [CokhiComponent, CokhimenuComponent,
    CokhifooterComponent, CokhiheaderComponent, Carousel1Component, TestmainComponent, NhixuanComponent],
  imports: [
    FormsModule,
    DropdownModule,
    InputTextModule,
    TranslateModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    CommonModule, CarouselModule,
    CokhiRoutingModule,
  ]
})
export class CokhiModule { }
