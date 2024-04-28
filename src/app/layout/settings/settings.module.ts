import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SpinnerModule } from 'primeng/spinner';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { FormatStrategyComponent } from './format-strategy/format-strategy.component';

import { environment as env } from '../../../environments/environment';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ResStatusSettingComponent } from './res-status-setting/res-status-setting.component';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';

// export const createTranslateLoader = (http: HttpClient) => {
//   return new TranslateHttpLoader(http, env.contextPath + '/assets/i18n/settings/', '.json');
// };
export function httpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    { prefix: env.contextPath + '/assets/i18n/settings/', suffix: '.json' },
    { prefix: env.contextPath + '/assets/i18n/ad-component/', suffix: '.json' }
  ]);
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SettingsRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ButtonModule,
    ConfirmDialogModule,
    DialogModule,
    DropdownModule,
    PanelModule,
    RadioButtonModule,
    SpinnerModule,
    ToastModule,
    TooltipModule,
  ],
  declarations: [SettingsComponent, FormatStrategyComponent, ResStatusSettingComponent]
})
export class SettingsModule { }
