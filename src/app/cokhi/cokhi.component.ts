import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppStoreService, AppStore } from '../shared';
import { AppConfigService } from '../app-config.service';

import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-cokhi',
  templateUrl: './cokhi.component.html',
  styleUrls: ['./cokhi.component.scss']
})
export class CokhiComponent implements OnInit {

  browserLang: string;
  siLangs: SelectItem[];
  selLang: string;
  
  profiles: any[] = [];
  selProfile: any;

  constructor(
    private appStore: AppStoreService,
    private trans: TranslateService,
    private appConfig: AppConfigService
  ) { 
    this.browserLang = this.trans.getBrowserLang().match(/en|fr|ur|es|it|fa|de/) ? this.trans.getBrowserLang() : 'en';
    this.trans.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de']);
    this.trans.setDefaultLang('en');
  }

  ngOnInit() {
      this.init();
  }

  init() {
    //init translation
    let lang = this.appStore.getData(AppStore.LANG, null);
    if (lang === null) {
      lang = sessionStorage.getItem('lang');
    }
    if (lang === null) {
      lang = this.browserLang;
    }
    sessionStorage.setItem('lang', lang);
    this.trans.use(lang);
    this.selLang = lang;

    let langs = this.appConfig.getConfig('langs');
    this.siLangs = [];
    langs.map(lang => {
      this.trans.get('lang.' + lang).subscribe(val => {
        let si: SelectItem = {
          label: val,
          value: lang
        };
        this.siLangs = [...this.siLangs, si];
      });
    });

    // let servers = this.appConfig.getConfig('profiles');
    // this.profiles = [...servers];
    // this.selProfile = null;
    // for (let pf of this.profiles) {
    //   if (pf.default) {
    //     this.selProfile = pf;
    //     break;
    //   }
    // }
    // if (!this.selProfile && this.profiles.length > 0) {
    //   this.selProfile = this.profiles[0];
    // }
    // this.appStore.initProfile(this.selProfile);
  }

  onLangChanged(event) {
    this.appStore.setData(AppStore.LANG, this.selLang);
    this.init();
  }
}
