import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment as env } from '../environments/environment';
// import primefaces modules
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DragDropModule } from 'primeng/dragdrop';
import { TooltipModule } from 'primeng/tooltip';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CarouselModule } from 'primeng/carousel';
import { DropdownModule } from 'primeng/dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard, AppStore } from './shared';

import { AppConfigService } from './app-config.service';
import { LoginService } from './shared';
import { AppStoreService } from './shared';
import { CokhiModule } from './cokhi/cokhi.module';
// import { CokhihomeComponent } from './cokhi/cokhihome/cokhihome.component';
import { CokhihomeModule } from './cokhi/cokhihome/cokhihome.module';
import { AdminModule } from './cokhi/admin/admin.module';
import { JwtInterceptor } from './_helpers/jwt.Interceptor';
// import { CokhimainComponent } from './cokhi/cokhihome/cokhimain/cokhimain.component';
// import { SalemainComponent } from './salepage/salehome/salemain/salemain.component';

//pipe
// AoT requires an exported function for factories
export const createTranslateLoader = (http: HttpClient) => {
  return new TranslateHttpLoader(http, env.contextPath + '/assets/i18n/', '.json');
};

let initConfig = (config: AppConfigService, store: AppStoreService) => async () => {
  console.log('calling config.load');
  let cf = await config.load();
  // console.log('loaded config', cf);
  let profiles: any[] = cf.profiles;
  let defPf = profiles.find(pf => pf.default);
  // console.log('default profile', defPf);
  if (defPf) {
    store.setData(AppStore.PROFILE, defPf);
  }
};

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ButtonModule,
    TableModule,
    DialogModule,
    DragDropModule,
    TooltipModule,
    RadioButtonModule,
    DropdownModule,
    CarouselModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    CokhiModule,
    CokhihomeModule,
    AdminModule
  ],
  declarations: [AppComponent,
    // DtcDatePipe
    // SalepageComponent, 
    // SalehomeComponent, 
    // SalemainComponent
  ],
  providers: [
    AuthGuard,
    AppConfigService,
    AppStoreService,
    {
      provide: LoginService,
      useClass: LoginService,
      deps: [HttpClient, AppStoreService]
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: initConfig,
      deps: [AppConfigService, AppStoreService]
    },
    { 
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor, 
      multi: true 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
