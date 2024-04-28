import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { FormatStrategyComponent } from './format-strategy/format-strategy.component';
import { ResStatusSettingComponent } from './res-status-setting/res-status-setting.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      {
        path: '',
        component: FormatStrategyComponent
      },
      {
        path: 'res',
        component: ResStatusSettingComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {}
