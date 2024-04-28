import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppStoreService, AppStore } from '../../shared';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  constructor(private trans: TranslateService, private appStore: AppStoreService) {
    this.trans.setDefaultLang('en');
    this.trans.use(this.appStore.getData(AppStore.LANG, 'en'));
  }

  ngOnInit() {}
}
