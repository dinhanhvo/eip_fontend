import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppStoreService, AppStore } from '../../shared';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  constructor(private trans: TranslateService, private appStore: AppStoreService) {
    this.trans.setDefaultLang('en');
    this.trans.use(this.appStore.getData(AppStore.LANG, 'en'));
  }

  ngOnInit() {}
}
