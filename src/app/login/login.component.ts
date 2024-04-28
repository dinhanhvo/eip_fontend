import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SelectItem } from 'primeng/api';

import { environment as env } from '../../environments/environment';
import { LoginService, AppStoreService, AppStore } from '../shared';
import { AppConfigService } from '../app-config.service';
import { routerTransition } from '../router.animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
  @Input() name = '';
  @Input() email = '';
  @Input() username = '';
  @Input() password = '';

  logo: string = env.contextPath + '/assets/images/eip-logo.png';
  bgImg: string = env.contextPath + '/assets/images/bg.jpg';
  processing = false;
  errors = [];

  siLangs: SelectItem[];
  profiles: any[] = [];
  selProfile: any;
  selLang: string;
  browserLang: string;
  height = 500;
  reload = true;
  isLogin = true;

  constructor(
    public router: Router,
    private loginService: LoginService,
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

  private init() {
    // init translation
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

    const langs = this.appConfig.getConfig('langs');
    this.siLangs = [];
    langs.map(lang => {
      this.trans.get('lang.' + lang).subscribe(val => {
        const si: SelectItem = {
          label: val,
          value: lang
        };
        this.siLangs = [...this.siLangs, si];
      });
    });

    const servers = this.appConfig.getConfig('profiles');
    this.profiles = [...servers];
    this.selProfile = null;
    for (const pf of this.profiles) {
      if (pf.default) {
        this.selProfile = pf;
        break;
      }
    }
    if (!this.selProfile && this.profiles.length > 0) {
      this.selProfile = this.profiles[0];
    }
    this.appStore.initProfile(this.selProfile);
    this.getScreenSize();
    this.reload = false;
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.height = window.innerHeight - 100;
  }

  swapTab() {
    this.isLogin = !this.isLogin;
  }
  onSubmitLogin() {
    console.log('Send login request to server: ', this.username, this.password, this.selLang);
    if (this.username.trim().length === 0 || this.password.length === 0) {
      this.errors = ['Username and password must not be empty.'];
      return;
    }
    this.processing = true;
    this.appStore.setData(AppStore.PROFILE, this.selProfile);
    this.loginService.login(this.username, this.password, this.selLang).subscribe(
      data => {
        this.processing = false;
        // console.log('receive login response', data);
        if (data.errors > 0) {
          console.log('Failed to login', data.errors);
          this.errors = data.errors.map((it, index) => {
            return it.userMessage;
          });
          console.log('errors', this.errors);
        } else {
          // localStorage.setItem('isLoggedin', 'true');
          // localStorage.setItem('token', data.data.token);
          this.appStore.login(this.username, data.accessToken, this.selLang, this.selProfile);
          // console.log('current session token', this.appStore.getAuth()['token']);
          // this.appStore.setData(AppStore.LANG, this.selLang);
          // this.appStore.setData(AppStore.LOGIN, this.username);
          this.router.navigate(['main']);
        }
      },
error => {
        this.processing = false;
        this.errors = ['Internal network error: ' + error.message];
        console.log('Internal network error', error);
      }
    );
    localStorage.setItem('isLoggedin', 'true');
  }

  onSubmitSignup() {
    console.log('Send signup request to server: ', this.name, this.email, this.username, this.password);
    if (this.username.trim().length === 0 || this.password.length === 0) {
      this.errors = ['Username and password must not be empty.'];
      return;
    }
    this.processing = true;
    this.appStore.setData(AppStore.PROFILE, this.selProfile);
    this.loginService.signUp(this.name, this.email, this.username, this.password).subscribe(
      data => {
        this.processing = false;
        // console.log('receive login response', data);
        if (data.errors > 0) {
          console.log('Failed to login', data.errors);
          this.errors = data.errors.map((it, index) => {
            return it.userMessage;
          });
          console.log('errors', this.errors);
        } else {
          // localStorage.setItem('isLoggedin', 'true');
          // localStorage.setItem('token', data.data.token);
          this.appStore.login(this.username, data.accessToken, this.selLang, this.selProfile);
          // console.log('current session token', this.appStore.getAuth()['token']);
          // this.appStore.setData(AppStore.LANG, this.selLang);
          // this.appStore.setData(AppStore.LOGIN, this.username);
          this.router.navigate(['admin']);
        }
      },
      error => {
        this.processing = false;
        this.errors = ['Internal network error: ' + error.message];
        console.log('Internal network error', error);
      }
    );
    // localStorage.setItem('isLoggedin', 'true');
  }
  onLangChanged(event) {
    this.appStore.setData(AppStore.LANG, this.selLang);
    this.init();
  }

  onChangeProfile() {
    this.appStore.initProfile(this.selProfile);
    this.reload = true;
    setTimeout(() => {
      this.reload = false;
    }, 1);
  }
}
