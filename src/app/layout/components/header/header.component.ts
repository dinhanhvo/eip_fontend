import { Component, OnInit, Input, OnDestroy, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { AppStoreService, AppStore, CommonAdApiService, CommonFunc } from '../../../shared';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { environment as env } from '../../../../environments/environment';
import { Menu } from '../../../domain';
import { AppConfigService } from '../../../app-config.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  pushRightClass: string = 'push-right';
  logo: string = env.contextPath + '/assets/images/logo-small.png';
  mainMenuItems: MenuItem[] = [];
  dashboardName: string = '';
  username: string = '';
  showDialog: boolean = false;

  dlgLeft: number = 0;
  dlgTop: number = 0;
  appVersion: any = {};
  apiVersion: any = {};
  dashaboard: any = {};

  @Input()
  onToggleSidebar: Function;

  private subscriptions: Subscription[] = [];

  constructor(
    private trans: TranslateService,
    public router: Router,
    private appStore: AppStoreService,
    private appConf: AppConfigService,
    private adApiSvc: CommonAdApiService
  ) {
    this.trans.use(sessionStorage.getItem('lang'));
    this.appStore.changeLang(sessionStorage.getItem('lang'));
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
        this.toggleSidebar();
      }
    });
    this.username = this.appStore.getAuth()['username'];
    this.apiVersion = 'server.version 1.0.0';
    // this.adApiSvc.getVersion().subscribe(
    //   resp => {
    //     if (resp.errors.length > 0) {
    //       console.log('Failed to fetch api version. Errors:', resp.errors);
    //     } else {
    //       this.apiVersion = resp.data;
    //       console.log('apiVersion', this.apiVersion);
    //     }
    //   },
    //   err => {
    //     console.log('Failed to fetch api version', err);
    //   }
    // );
  }

  ngOnInit() {
    // console.log('Init Header');
    let sub = this.appStore.getObservable(AppStore.DASHBOARD).subscribe(value => {
      if (value !== null) {
        this.dashboardName = value.transName;
      } else {
        this.dashboardName = '';
      }
    });
    this.subscriptions.push(sub);

    sub = this.appStore.getObservable(AppStore.MENU).subscribe(value => {
      this.initMenu();
    });
    this.subscriptions.push(sub);

    sub = this.appStore.getObservable(AppStore.OPENED_DASHBOARDS).subscribe(value => {
      //console.log('Re-initialize main menu for changes of opened dashboards');
      this.initMenu();
    });

    this.initMenu();
    this.initAppVersion();
  }

  initAppVersion() {
    let ver = this.appConf.getVersion();
    if (ver === null || ver === undefined) {
      setTimeout(() => {
        this.initAppVersion();
      }, 1000);
    } else {
      this.appVersion = CommonFunc.clone(ver);
      // console.log('appVersion', this.appVersion);
    }
  }

  // @HostListener('window:resize', ['$event'])
  // onResize(event) {
  //   this.viewW = window.innerWidth;
  //   this.dlgLeft = window.innerWidth - 300;
  // }

  initMenu() {
    this.mainMenuItems = [
      // this.initFileMenu(),
      // this.initDashboardMenu(),
      // this.initToolsMenu(),
      // this.initHelpMenu(),
      this.initProfileMenu(),
      // this.initLangMenu()
    ];
  }

  private transMenuLabels(menus: MenuItem[]) {
    for (let it of menus) {
      this.trans.get(it.label).subscribe(val => {
        it.label = val;
      });
    }
  }

  // private initLangMenu(): MenuItem {
  //   let lang = this.appStore.getData(AppStore.LANG, 'en');
  //   let itsToTrans: MenuItem[] = [];
  //   let mnuLang: MenuItem = {
  //     label: 'lang.' + lang
  //   };
  //   itsToTrans = [mnuLang];
  //   this.transMenuLabels(itsToTrans);
  //   return mnuLang;
  // }

  private initProfileMenu(): MenuItem {
    let login = this.appStore.getData(AppStore.LOGIN, '');
    let profile = this.appStore.getData(AppStore.PROFILE, {});
    let itsToTrans: MenuItem[] = [];

    let helpMenu: MenuItem = {
      label: login + '@' + profile.name,
      icon: 'fa fa-user'
    };
    let its: MenuItem[] = [
      {
        label: 'Change Pass',
        icon: 'fa fa-edit'
      },
      {
        label: 'logOut',
        icon: 'fa fa-power-off',
        command: event => {
          this.onLoggedout();
        }
      }
    ];
    helpMenu.items = [...its];
    itsToTrans = [...itsToTrans, ...its];
    this.transMenuLabels(itsToTrans);
    return helpMenu;
  }

  // private initHelpMenu(): MenuItem {
  //   let itsToTrans: MenuItem[] = [];
  //   let mnuHelp: MenuItem = {
  //     label: 'help',
  //     icon: 'fa fa-book'
  //   };
  //   itsToTrans = [...itsToTrans, mnuHelp];

  //   let verItem: MenuItem = {
  //     label: 'version',
  //     icon: 'fa fa-file-alt',
  //     command: event => {
  //       this.onShowVersion(event);
  //     }
  //   };
  //   itsToTrans = [...itsToTrans, verItem];

  //   let hcItem: MenuItem = {
  //     label: 'hdrMnu.helpC',
  //     icon: 'fa fa-file-alt'
  //   };
  //   let hcSubItems: MenuItem[] = [
  //     {
  //       label: 'hdrMnu.downPdf',
  //       icon: 'pi pi-fw pi-download'
  //     }
  //   ];
  //   hcItem.items = [...hcSubItems];
  //   itsToTrans = [...itsToTrans, hcItem, ...hcSubItems];

  //   let buItem: MenuItem = {
  //     label: 'bu',
  //     icon: 'fa fa-file-alt'
  //   };
  //   let buSubItems: MenuItem[] = [
  //     { label: 'open', icon: 'fa fa-desktop' },
  //     { label: 'download', icon: 'pi pi-fw pi-download' }
  //   ];
  //   buItem.items = [...buSubItems];
  //   itsToTrans = [...itsToTrans, buItem, ...buSubItems];

  //   let cItem: MenuItem = {
  //     label: 'CEUL',
  //     icon: 'fa fa-file-alt'
  //   };
  //   let cSubItems: MenuItem[] = [
  //     { label: 'open', icon: 'fa fa-desktop' },
  //     { label: 'download', icon: 'pi pi-fw pi-download' }
  //   ];
  //   cItem.items = [...cSubItems];
  //   itsToTrans = [...itsToTrans, cItem, ...cSubItems];

  //   mnuHelp.items = [verItem, hcItem, buItem, cItem];
  //   this.transMenuLabels(itsToTrans);
  //   return mnuHelp;
  // }

  // private initToolsMenu(): MenuItem {
  //   let itsToTrans: MenuItem[] = [];
  //   let mnuTools: MenuItem = {
  //     id: 'mm.tools',
  //     label: 'hdrMnu.tools',
  //     icon: 'fa fa-book'
  //   };
  //   itsToTrans.push(mnuTools);
  //   let its: MenuItem[] = [
  //     {
  //       id: 'mm.language',
  //       label: 'language',
  //       command: event => {
  //         this.onEditTranslation();
  //       }
  //     }
  //   ];
  //   for (let it of its) {
  //     itsToTrans.push(it);
  //   }
  //   mnuTools.items = [...its];
  //   this.transMenuLabels(itsToTrans);
  //   return mnuTools;
  // }

  // private initDashboardMenu(): MenuItem {
  //   let openedWbItems: MenuItem[] = [];
  //   let openedWbs: any[] = this.appStore.getData(AppStore.OPENED_DASHBOARDS, []);
  //   for (let wb of openedWbs) {
  //     openedWbItems.push({
  //       label: wb.name,
  //       disabled: false,
  //       command: event => {
  //         let url = this.router.routerState.snapshot.url;
  //         if (!url.startsWith('/workbook/' + wb.id)) {
  //           this.router.navigate(['/workbook', wb.id]);
  //         }
  //       }
  //     });
  //   }
  //   let itsToTrans: MenuItem[] = [];

  //   let mnuDashboard: MenuItem = {
  //     id: 'mm.dashboard',
  //     label: 'dashboard',
  //     icon: 'fa fa-book',
  //     items: openedWbItems
  //   };
  //   itsToTrans.push(mnuDashboard);
  //   this.transMenuLabels(itsToTrans);
  //   return mnuDashboard;
  // }

  // private initFileMenu(): MenuItem {
  //   let menu: Menu = this.appStore.getMenuData();
  //   // let itsToTrans: MenuItem[] = [];
  //   // let mnuFile: MenuItem = {
  //   //   label: 'File'
  //   // };
  //   // itsToTrans.push(mnuFile);

  //   // let its: MenuItem[] = [
  //   //   {
  //   //     label: 'hdrMnu.newWb',
  //   //     disabled: false,
  //   //     command: event => {
  //   //       this.onNewDashboard();
  //   //     }
  //   //   },
  //   //   {
  //   //     label: 'open',
  //   //     disabled: false,
  //   //     command: event => {
  //   //       this.onOpenDashboard();
  //   //     }
  //   //   },
  //   //   {
  //   //     label: 'save',
  //   //     disabled: !menu.saveEnabled,
  //   //     command: event => {
  //   //       this.onSave();
  //   //     }
  //   //   },
  //   //   {
  //   //     label: 'saveAs',
  //   //     disabled: !menu.saveAsEnabled,
  //   //     command: event => {
  //   //       this.onSaveAs();
  //   //     }
  //   //   },
  //   //   {
  //   //     label: 'saveAsFile',
  //   //     disabled: !menu.saveAsFileEnabled,
  //   //     command: event => {
  //   //       this.onSaveAsFile();
  //   //     }
  //   //   },
  //   //   {
  //   //     label: 'share',
  //   //     disabled: !menu.saveAsEnabled
  //   //   }
  //   // ];
  //   // for (let it of its) {
  //   //   itsToTrans.push(it);
  //   // }
  //   // mnuFile.items = [...its];
  //   // this.transMenuLabels(itsToTrans);
  //   return null;
  // }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
    this.subscriptions = [];
  }

  isToggled(): boolean {
    const dom: Element = document.querySelector('body');
    return dom.classList.contains(this.pushRightClass);
  }

  toggleSidebar() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle(this.pushRightClass);
    this.onToggleSidebar && this.onToggleSidebar();
    console.log('toggled sidebar');
  }

  rltAndLtr() {
    const dom: any = document.querySelector('body');
    dom.classList.toggle('rtl');
  }

  onLoggedout() {
    console.log('Perform logout');
    this.appStore.logout();
    this.router.navigate(['/login']);
  }

  onEditTranslation() {
    this.appStore.setData(AppStore.MM_LANGUAGE, { src: 'mainMenu' });
  }

  onOpenDashboard() {
    this.router.navigate(['/home']);
  }

  /**call at wb layout component */
  onSave() {
    this.appStore.setData(AppStore.SAVE, new Date());
  }

  /**call at wb layout component */
  onSaveAs() {
    this.appStore.setData(AppStore.SAVE_AS, new Date());
  }

  /**call at wb layout component */
  onSaveAsFile() {
    this.appStore.setData(AppStore.SAVE_AS_FILE, new Date());
  }

  onNewDashboard() {
    this.router.navigate(['/workbook']);
  }

  onShowVersion(event) {
    console.log('version event', event);
    let x = event.originalEvent.clientX;
    //let y = event.originalEvent.clientY;
    this.dlgLeft = x - 30;
    this.dlgTop = 70;
    this.showDialog = true;
  }
}
