import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';

const routes: Routes = [
  { path: '', loadChildren: './layout/layout.module#LayoutModule', canActivate: [AuthGuard] },
  // { path: '', loadChildren: './layout/layout.module#LayoutModule'},
  // { path: 'login', loadChildren: './login/login.module#LoginModule' },
  // { path: '', redirectTo: 'admin', pathMatch: 'prefix' },
  // { path: 'admin', loadChildren: './layout/layout.module#LayoutModule' }, // admin page ', canActivate: [AuthGuard]'
  { path: 'login', loadChildren: './login/login.module#LoginModule' },
  // { path: 'home', loadChildren: './cokhi/cokhi.module#CokhiModule' }, // sale page home
  // { path: '', loadChildren: './cokhi/cokhi.module#CokhiModule' },
  // { path: 'datacom', loadChildren: './salepage/salepage.module#SalepageModule' },
  // { path: 'login', loadChildren: './login/login.module#LoginModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupModule' },
  // { path: 'exp-chart', loadChildren: './exp-chart/exp-chart.module#ExpChartModule' },
  { path: 'error', loadChildren: './server-error/server-error.module#ServerErrorModule' },
  { path: 'access-denied', loadChildren: './access-denied/access-denied.module#AccessDeniedModule' },
  { path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule' },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
