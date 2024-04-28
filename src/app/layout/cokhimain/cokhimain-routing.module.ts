import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CokhimainComponent } from './cokhimain.component';
import { MainComponent } from './main/main.component';
import { InsertProductComponent } from './insert-product/insert-product.component';
import { CategoryComponent } from './category/category/category.component'
import { LogoComponent } from './logo/logo.component';
import { NhixuanComponent } from './nhixuan/nhixuan.component';
import { PatientComponent } from './patient/patient.component';
import { ThuocComponent } from './thuoc/thuoc.component';
import { KhambenhComponent } from './khambenh/khambenh.component';
import { TomtatComponent } from './tomtat/tomtat.component';
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


const routes: Routes = [{
  path: '',
  component: CokhimainComponent,
  children: [
    // { path: '', redirectTo: 'khambenh' },
    { path: '', redirectTo: 'main' },
    { path: 'main', component: MainComponent },
    { path: 'insert', component: InsertProductComponent },
    { path: 'category', component: CategoryComponent },
    { path: 'thuoc', component: ThuocComponent },
    { path: 'can', component: PatientComponent },
    { path: 'khambenh', component: KhambenhComponent },
    { path: 'tomtatcc', component: TomtatComponent },
    { path: 'thongke', component: ThongkeComponent },
    { path: 'nhacc', component: ProviderComponent },
    { path: 'logo', component: LogoComponent },
    { path: 'nhixuan', component: NhixuanComponent },
    { path: 'nhapthuoc', component: NhapthuocComponent },
    { path: 'xuatthuoc', component: XuatthuocComponent },
    { path: 'giathuoc', component: GiathuocComponent },
    { path: 'giacls', component: GiaclsComponent },
    { path: 'excelltool', component: ExceltoolComponent },
    { path: 'nhaptieuhao', component: NhaptieuhaoComponent },
    { path: 'ketoanthongke', component: KetoanthongkeComponent },
    { path: 'xuatnhapton', component:  XuatnhaptonComponent}, // ThekhoComponent
    { path: 'parseexcel', component: ParseExcelComponent },
    { path: 'pkbexcel', component: PkbExcelComponent },
    { path: 'thekho', component: ThekhoComponent },
    { path: 'patientreport', component: PatientReportComponent },
    { path: 'tonghop', component: TonghopComponent },
    { path: 'thuocreport', component: ThuocReportComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CokhimainRoutingModule { }
