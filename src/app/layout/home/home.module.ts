import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService, ConfirmationService } from 'primeng/api';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';

import { environment as env } from '../../../environments/environment';
import { PageHeaderModule, SplitterModule } from '../../shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MainComponent } from './main/main.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { HttpClient } from '@angular/common/http';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// AoT requires an exported function for factories
// export const createTranslateLoader = (http: HttpClient) => {
//   return new TranslateHttpLoader(http, env.contextPath + '/assets/i18n/layout/home_', '.json');
// };
export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    { prefix: env.contextPath + '/assets/i18n/layout/home/', suffix: '.json' },
    { prefix: env.contextPath + '/assets/i18n/ad-component/', suffix: '.json' }
  ]);
}

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    TableModule,
    ScrollPanelModule,
    ButtonModule,
    ToastModule,
    PageHeaderModule,
    SplitterModule,
    ConfirmDialogModule,
    DialogModule
  ],
  declarations: [HomeComponent, MainComponent],
  providers: [MessageService, ConfirmationService]
})
export class HomeModule { }
