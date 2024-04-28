import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService, ConfirmationService } from 'primeng/api';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { FileUploadModule } from 'primeng/fileupload';
import { PanelModule } from 'primeng/panel';
import { CalendarModule } from 'primeng/calendar';
import { TabViewModule } from 'primeng/tabview';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MultiSelectModule } from 'primeng/multiselect';
import { AccordionModule } from 'primeng/accordion';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ListboxModule } from 'primeng/listbox';
import { PickListModule } from 'primeng/picklist';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CheckboxModule } from 'primeng/checkbox';
import {ProgressBarModule} from 'primeng/progressbar';

import { environment as env } from '../../../environments/environment';
import { PageHeaderModule, SplitterModule } from '../../shared';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { HttpClient } from '@angular/common/http';

import { CokhimainRoutingModule } from './cokhimain-routing.module';
import { CokhimainComponent } from './cokhimain.component';
import { MainComponent } from './main/main.component';
import { InsertProductComponent } from './insert-product/insert-product.component';
import { CategoryComponent } from './category/category/category.component';
import { LogoComponent } from './logo/logo.component';
import { NhixuanComponent } from './nhixuan/nhixuan.component';
import { PatientComponent } from './patient/patient.component';
import { ThuocComponent } from './thuoc/thuoc.component';
import { KhambenhComponent } from './khambenh/khambenh.component';
import { TomtatComponent } from './tomtat/tomtat.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { ExceltoolComponent } from './exceltool/exceltool.component';
import { ThongkeComponent } from './thongke/thongke.component';
import { ProviderComponent } from './provider/provider.component';
import { NhapthuocComponent } from './provider/nhapthuoc/nhapthuoc.component';
import { XuatthuocComponent } from './xuatthuoc/xuatthuoc.component';
import { GiathuocComponent } from './giathuoc/giathuoc.component';
import { GiaclsComponent } from './giacls/giacls.component';
import { NhaptieuhaoComponent } from './nhaptieuhao/nhaptieuhao.component';
import { KetoanthongkeComponent } from './ketoanthongke/ketoanthongke.component';
import { ThekhoComponent } from './thekho/thekho.component';
import { ParseExcelComponent } from './parse-excel/parse-excel.component';
import { KhokhuComponent } from './khokhu/khokhu.component';
import { TonghopComponent } from './tonghop/tonghop.component';
import { XuatnhaptonComponent } from './xuatnhapton/xuatnhapton.component';
import { PatientReportComponent } from './patient-report/patient-report.component';
import { ThuocReportComponent } from './thuoc-report/thuoc-report.component';
import { PkbExcelComponent } from './khambenh/pkb-excel/pkb-excel.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    { prefix: env.contextPath + '/assets/i18n/layout/home/', suffix: '.json' },
    { prefix: env.contextPath + '/assets/i18n/ad-component/', suffix: '.json' }
  ]);
}

@NgModule({
  declarations: [CokhimainComponent, MainComponent, InsertProductComponent,
    CategoryComponent, LogoComponent, 
    NhixuanComponent, PatientComponent, ThuocComponent, KhambenhComponent, TomtatComponent,
    AddPatientComponent,
    ExceltoolComponent,
    ThongkeComponent,
    ProviderComponent,
    NhapthuocComponent,
    XuatthuocComponent,
    GiathuocComponent,
    GiaclsComponent,
    NhaptieuhaoComponent,
    KetoanthongkeComponent,
    ThekhoComponent,
    ParseExcelComponent,
    KhokhuComponent,
    TonghopComponent,
    XuatnhaptonComponent,
    PatientReportComponent,
    ThuocReportComponent,
    PkbExcelComponent
  ],
  imports: [
    CommonModule,
    CokhimainRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FormsModule,
    TableModule,
    ButtonModule,
    ToastModule,
    PageHeaderModule,
    SplitterModule,
    ConfirmDialogModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    FileUploadModule,
    PanelModule,
    CalendarModule,
    TabViewModule,
    KeyFilterModule,
    MultiSelectModule,
    AccordionModule,
    InputSwitchModule,
    ListboxModule,
    PickListModule,
    ProgressSpinnerModule,
    CheckboxModule,
    ProgressBarModule
  ],
  providers: [MessageService, ConfirmationService]
})
export class CokhimainModule { }
