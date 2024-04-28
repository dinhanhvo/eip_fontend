import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CokhihomeComponent } from './cokhihome.component';
import { CokhimainComponent } from './cokhimain/cokhimain.component';
import { ProductsdetailComponent } from '../components/productsdetail/productsdetail.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ProductsHomeComponent } from './products-home/products-home.component';

const routes: Routes = [
  {
    path: '', component: CokhihomeComponent,
    children: [
      { path: '', redirectTo: 'main', pathMatch: 'prefix' },
      { path: 'main', component: CokhimainComponent },
      { path: 'products', component: ProductsHomeComponent },
      { path: 'products/:categoryId', component: ProductsHomeComponent },
      { path: 'productsdetail/:prId', component: ProductsdetailComponent },
      { path: 'contactus', component: ContactusComponent },
      // { path: 'searchresult', component: SearchResultComponent },
      // { path: 'bookinfo', component: BookinfoComponent },
      // { path: 'bookcomplete', component: BookcompleteComponent },
      // { path: 'mayhan', loadChildren: './dashboard/dashboard.module#DashboardModule' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CokhihomeRoutingModule { }
