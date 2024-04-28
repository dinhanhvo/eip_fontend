import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CokhiComponent } from './cokhi.component';
import { TestmainComponent } from './test/testmain/testmain.component';
import { NhixuanComponent } from './nhixuan/nhixuan.component';
const routes: Routes = [
  {
    path: '',
    component: CokhiComponent,
    children: [
      // { path: '', redirectTo: 'home', pathMatch: 'prefix' },
      { path: '', loadChildren: './cokhihome/cokhihome.module#CokhihomeModule' },
      // { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
      { path: 'demo', component: TestmainComponent },
      { path: 'nhixuan', component: NhixuanComponent },
      // { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CokhiRoutingModule { }
