import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      // { path: '', redirectTo: 'home', pathMatch: 'prefix' },
      // { path: 'home', loadChildren: './cokhihome/cokhihome.module#CokhihomeModule' },
      // { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
      // { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
