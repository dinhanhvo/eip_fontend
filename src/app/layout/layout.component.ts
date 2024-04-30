import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { LoginService, AppStoreService, AppStore } from '../shared';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Menu } from '../domain';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  onToggleSidebar: Function;

  showSidebar: boolean = true;

  timer: any;
  validating: boolean;
  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private trans: TranslateService,
    private loginSvc: LoginService,
    private appStore: AppStoreService
  ) {
    this.trans.setDefaultLang('en');
    this.trans.use(this.appStore.getData(AppStore.LANG, 'en'));
  }

  ngOnInit() {
    this.onToggleSidebar = this.toggleSidebar.bind(this);
    // this.validateSession();
    // this.timer = setInterval(() => {
    //   this.validateSession();
    // }, 60 * 1000);
    let sub = this.appStore.getObservable(AppStore.MENU).subscribe(menu => {
      this.showSidebar = menu.showSidebar;
    });
    this.subscriptions.push(sub);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
    for (let sub of this.subscriptions) {
      sub.unsubscribe();
    }
    this.subscriptions = [];
  }

  toggleSidebar() {
    this.appStore.computeMenuAndSet(function(menu: Menu) {
      menu.showSidebar = !menu.showSidebar;
    });
  }

  validateSession(): void {
    if (this.validating || !this.appStore.isAuth()) {
      return;
    }
    this.validating = true;
    this.loginSvc.validateSession(this.appStore.getAuth()['token']).subscribe(
      data => {
        this.validating = false;
        //console.log('got data', data);
        if (data.errors && data.errors.length > 0) {
          console.log('Current session invalid. Getting out...');
          this.appStore.logout();
          this.router.navigate(['/login']);
        }
        //clearInterval(this.timer);
      },
      error => {
        this.validating = false;
        console.log('Error while validating session', error);
        //clearInterval(this.timer);
      }
    );
  }
}
