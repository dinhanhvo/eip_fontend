import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      // { path: '', redirectTo: 'home', pathMatch: 'prefix' },
      { path: '', redirectTo: 'admin', pathMatch: 'prefix' },
      { path: 'admin', loadChildren: './cokhimain/cokhimain.module#CokhimainModule' },
      // { path: 'oldhome', loadChildren: './home/home.module#HomeModule' },
      // { path: 'admin', loadChildren: './layout/layout.module#LayoutModule' }, // admin page ', canActivate: [AuthGuard]'

      // { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
      // { path: 'publication', loadChildren: './publication/publication.module#PublicationModule' },
      // { path: 'ad-reports', loadChildren: './ad-reports/ad-reports.module#AdReportsModule' },
      // { path: 'mass-publication', loadChildren: './mass-publication/mass-publication.module#MassPublicationModule' },
      // { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
      // { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
      // {
      //   path: 'generator-properties',
      //   loadChildren: './generator-properties/generator-properties.module#GeneratorPropertiesModule'
      // },
      // { path: 'forms', loadChildren: './form/form.module#FormModule' },
      // { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
      // { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
      { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' },
      // { path: 'workbook', loadChildren: './workbook/workbook.module#WorkbookModule' },
      // { path: 'wb-sharing', component: SharingComponent },
      { path: 'settings', loadChildren: './settings/settings.module#SettingsModule' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
