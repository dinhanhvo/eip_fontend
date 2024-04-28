import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DragDropModule } from 'primeng/dragdrop';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { PickListModule } from 'primeng/picklist';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ListboxModule } from 'primeng/listbox';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SpinnerModule } from 'primeng/spinner';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TreeModule } from 'primeng/tree';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonPipeModule } from '../common-pipe.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { environment as env } from '../../environments/environment';
export const createTranslateLoader = (http: HttpClient) => {
  return new TranslateHttpLoader(http, env.contextPath + '/assets/i18n/login/', '.json');
};
@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    LoginRoutingModule,
    ButtonModule,
    CalendarModule,
    CommonModule,
    CommonPipeModule,
    CheckboxModule,
    DragDropModule,
    InputTextModule,
    ListboxModule,
    PaginatorModule,
    PanelModule,
    PickListModule,
    ProgressSpinnerModule,
    ScrollPanelModule,
    SpinnerModule,
    TableModule,
    TabViewModule,
    ToastModule,
    ConfirmDialogModule,
    DialogModule,
    CardModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    TreeModule
  ],
  declarations: [LoginComponent],
  providers: [MessageService, ConfirmationService]
})
export class LoginModule { }
