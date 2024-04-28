import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// import { Router, ActivatedRoute } from '@angular/router';
// import { MessageService, ConfirmationService } from 'primeng/api';
// import { TranslateService } from '@ngx-translate/core';

// import { Workbook, Schedule } from '../../../domain';
// import { AppStoreService, AppStore, UserService, CommonFunc, DashboardService } from '../../../shared';
import { routerTransition } from '../../../router.animations';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [routerTransition()],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit {
  // workbooks: Workbook[];
  // selWorkbook: any;
  // wbFetching: boolean = false;
  // colWidths: number[] = [];
  // wbDepends: any[];

  // schedules: Schedule[];
  // schTblCols: any[];
  // selSchedule: any;
  // delPrivilige = true;
  // loaded = true;
  // displayPopup = false;

  constructor(
  //   private msgSvc: MessageService,
  //   private router: Router,
  //   private dashboardSvc: DashboardService,
  //   private confirmationService: ConfirmationService,
  //   private appStore: AppStoreService,
  //   public trans: TranslateService,
  //   private userSvc: UserService
  ) {}

  ngOnInit() {
  //   this.colWidths = [80, 0, 120, 120];
  }

  // onWbRowSelect(event) {
  //   this.selWorkbook = event.data;
  //   this.userSvc.getUserPrivileges(this.selWorkbook.boId).subscribe(
  //     resp => {
  //       if (resp.data) {
  //         this.delPrivilige = resp.data.delete;
  //       }
  //     },
  //     err => {}
  //   );
  // }

  // onWbRowUnSelect() {
  //   this.selWorkbook = null;
  //   this.delPrivilige = true;
  // }

  // disDeleteWb() {
  //   return !this.isSelectedWb() || !this.delPrivilige;
  // }

  // isSelectedWb() {
  //   return !CommonFunc.isEmpty(this.selWorkbook);
  // }

  // onDeleteWb(event) {
  //   let msg = this.trans.instant('Are you sure that you want to delete dashboard :wbName?');
  //   msg = CommonFunc.prepareData(msg, { wbName: this.selWorkbook.name });
  //   this.confirmationService.confirm({
  //     message: msg,
  //     accept: () => {
  //       this.deleteWb(this.selWorkbook, false);
  //     }
  //   });
  // }

  // reload() {
  //   this.onWbRowUnSelect();
  //   this.loaded = false;
  //   setTimeout(() => {
  //     this.loaded = true;
  //   }, 5);
  // }

  // deleteWb(wb, ignoreDependency: boolean) {
  //   this.dashboardSvc.delDashboard(wb.boId, ignoreDependency).subscribe(
  //     resp => {
  //       if (resp.data) {
  //         if (resp.data.delete) {
  //           this.msgSvc.add({ severity: 'info', summary: 'Delete dashboard', detail: 'Success!' });
  //           this.selWorkbook = null;
  //           this.reload();
  //           this.cancelPopup();
  //         } else if (resp.data.dependencies) {
  //           this.wbDepends = resp.data.dependencies;
  //           this.displayPopup = true;
  //         }
  //       } else {
  //         this.msgSvc.add({ severity: 'error', summary: 'Delete dashboard', detail: resp.errors[0].userMessage });
  //       }
  //     },
  //     err => {
  //       this.msgSvc.add({ severity: 'error', summary: 'Delete dashboard', detail: err });
  //     }
  //   );
  // }

  // cancelPopup() {
  //   this.displayPopup = false;
  //   this.wbDepends = null;
  // }

  // onDeleteDependency() {
  //   this.deleteWb(this.selWorkbook, true);
  // }

  // onOpenDashboard(evt) {
  //   if (this.selWorkbook) {
  //     // set current working dashboard
  //     this.appStore.setData(AppStore.DASHBOARD, null);

  //     //hide sidebar before open workbook
  //     this.appStore.getMenuData().showSidebar = false;
  //     //this.router.navigate(['/home/workbook', this.selWorkbook.id]);
  //     this.router.navigate(['/workbook', this.selWorkbook.id]);
  //   } else {
  //     this.msgSvc.add({ severity: 'warn', summary: 'Warning', detail: 'No workbook selected', life: 5000 });
  //   }
  // }

  // onOpenWbSharing(event) {
  //   this.router.navigate(['/wb-sharing']);
  // }
}
