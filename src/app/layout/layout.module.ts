import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClient } from '@angular/common/http';

import { environment as env } from '../../environments/environment';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import { AdReportsModule } from './ad-reports/ad-reports.module';

// AoT requires an exported function for factories
export const createTranslateLoader = (http: HttpClient) => {
  return new TranslateHttpLoader(http, env.contextPath + '/assets/i18n/layout/', '.json');
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    MenubarModule,
    MenuModule,
    DialogModule,
    CheckboxModule,
    InputTextModule,
    LayoutRoutingModule,
    // AdReportsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    NgbDropdownModule,
  ],
  declarations: [LayoutComponent, SidebarComponent, HeaderComponent]
})
export class LayoutModule { }
