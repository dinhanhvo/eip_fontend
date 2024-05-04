import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Menu } from '../../domain';

const LANG = 'lang';
const PROFILE = 'profile';
const LOGIN = 'login';
const DASHBOARD = 'dashboard';
const OPENED_DASHBOARDS = 'openedDashboards';
const MENU: string = 'menu';
const MM_LANGUAGE = 'mmLanguage';
const SHEET: string = 'sheet';
const SAVE: string = 'onSave';
const SAVE_AS: string = 'onSaveAs';
const SAVE_AS_FILE: string = 'onSaveAsFile';
const DELETE_SHEET: string = 'onDeleteSheet';

const CODE_SELLER: string = 'codeSeller';

export const AppStore = {
  LANG,
  PROFILE,
  LOGIN,
  DASHBOARD,
  DELETE_SHEET,
  MENU,
  MM_LANGUAGE,
  OPENED_DASHBOARDS,
  SHEET,
  SAVE,
  SAVE_AS,
  SAVE_AS_FILE,
  CODE_SELLER
};

@Injectable({
  providedIn: 'root'
})
export class AppStoreService {
  // private currentUserSubject: BehaviorSubject<User>;
  // public currentUser: Observable<User>;

  private bAuth: boolean = false;
  private auth: Object = {
    token: '',
    username: ''
  };

  private userProfile: Object = {
    id: 0,
    username: '',
    name: ''
  }

  private data: Object = {};

  private observerbles: Object = {};

  private langSource = new BehaviorSubject<string>(sessionStorage.getItem('lang'));
  currentLang = this.langSource.asObservable();

  constructor() {
    const auth = sessionStorage.getItem('auth');
    if (auth !== null && auth.length > 0) {
      let obj = JSON.parse(auth);
      if (obj) {
        this.bAuth = true;
        this.auth = {
          username: obj.username,
          token: obj.token
        };
        const pf = sessionStorage.getItem(PROFILE);
        obj = JSON.parse(pf);
        if (obj) {
          this.setData(PROFILE, obj);
        }
        this.setData(LOGIN, sessionStorage.getItem(LOGIN));
        this.setData(LANG, sessionStorage.getItem(LANG));
      }
    }
  }

  getData(key: string, defValue: any): any {
    if (this.data[key]) {
      return this.data[key];
    }
    return defValue;
  }

  getMenuData(): any {
    if (!this.data[MENU]) {
      let menu = new Menu();
      this.setData(MENU, menu);
    }
    return this.data[MENU];
    // return null;
  }

  computeMenuAndSet(doSth: Function): any {
    let menu = this.getMenuData();
    doSth(menu);
    this.setData(MENU, menu);
  }

  computeAndSet(key: string, defValue: any, doSth: Function): any {
    if (!this.data[key]) {
      doSth(this.data[key]);
      this.setData(key, defValue);
    }
  }

  setData(key: string, value: any): any {
    this.data[key] = value;
    //console.log('set data', key, value);
    if (this.observerbles[key]) {
      console.log('notify value change', key, value);
      this.observerbles[key].next(value);
    }
  }

  /**
   * sometime we just only need observer
   * and notify data change
   * to prevent store many data.
   */
  notify(key: string, value: any) {
    if (this.observerbles[key]) {
      //console.log('notify value change', key, value);
      this.observerbles[key].next(value);
    }
  }

  getObservable(key: string): Observable<any> {
    if (this.observerbles[key]) {
      return this.observerbles[key];
    }
    let newObservable = new Subject();
    this.observerbles[key] = newObservable;
    //console.log('observables: ', this.observerbles);
    return newObservable;
  }

  initProfile(profile) {
    sessionStorage.setItem(PROFILE, JSON.stringify(profile));
    this.setData(PROFILE, profile);
  }

  login(username, token, lang, profile) {
    this.bAuth = true;
    this.auth = {
      token,
      username
    };
    console.log('current session token', token);
    sessionStorage.setItem('auth', JSON.stringify(this.auth));
    this.initProfile(profile);
    sessionStorage.setItem(LOGIN, username);
    sessionStorage.setItem(LANG, lang);
    this.setData(LOGIN, username);
    this.setData(LANG, lang);
  }

  logout() {
    this.bAuth = false;
    this.auth = {
      token: '',
      username: ''
    };
    sessionStorage.setItem('auth', null);

    this.data = {};
    Object.values(this.observerbles).forEach(obj => {
      (obj as Subject<any>).unsubscribe();
    });
    this.observerbles = {};
  }

  isAuth() {
    return this.bAuth;
  }

  getAuth(): Object {
    return { ...this.auth };
  }

  changeLang(lang: string) {
    this.langSource.next(lang);
  }
}
