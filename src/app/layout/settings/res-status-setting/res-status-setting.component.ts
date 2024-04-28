import { Component, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonAdApiService, CommonFunc } from '../../../shared';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-res-status-setting',
  templateUrl: './res-status-setting.component.html',
  styleUrls: ['./res-status-setting.component.scss']
})
export class ResStatusSettingComponent implements OnInit {
  clResourcesEnabled: string = '';

  colRes: any = {};
  clRes: any = {};
  editExpr: string;

  showDlgCronExpr = false;
  sysResSettings: any = null;

  private adgSettings: any = null;

  constructor(private trans: TranslateService, private msgSvc: MessageService, private adApiSvc: CommonAdApiService) {}

  ngOnInit() {
    this.init();
  }

  onEditClInterval(event) {
    //console.log('edit clean resource interval');
    this.editExpr = this.clRes.clResourcesInterval;
    this.showDlgCronExpr = true;
  }

  onCronEditOK(event) {
    //console.log('edit cron ok', event);
    this.clRes.clResourcesInterval = event.expr;
    this.showDlgCronExpr = false;
  }

  onCronEditCancel(event) {
    this.showDlgCronExpr = false;
  }

  onBtnSave() {
    if (!this.validateSettings()) {
      return;
    }
    //save settings
    let objs = [this.adgSettings, this.sysResSettings];
    this.adApiSvc.saveSettings(objs).subscribe(
      resp => {
        if (resp.errors.length > 0) {
          console.log('res-status-setting // save settings // return errors', resp.errors);
          this.showError(resp.errors[0]);
          return;
        }
        this.showInfo('success');
      },
      err => {
        console.log('res-status-setting // save settings // network error', err);
        this.showError(err);
      }
    );
  }

  onBtnCancel() {
    this.init();
  }

  private init() {
    //Load adgSettings
    this.adApiSvc.getAdgSettings().subscribe(
      resp => {
        if (resp.errors.length > 0) {
          console.log('res-status-setting // getAdgSettings // return errors', resp.errors);
          return;
        }
        let data = resp.data;
        this.adgSettings = data.adgSettings;
        console.log('Got adgSettings', this.adgSettings);

        this.clRes = this.adgSettings.cleanUp;
        this.clRes.txtEnabled = this.clRes.clResourcesEnabled ? 'true' : 'false';
        console.log('clRes', this.clRes);
      },
      err => {
        console.log('res-status-setting // getAdgSettings // network error', err);
      }
    );

    //Load system resource settings
    this.adApiSvc.getSysResSettings().subscribe(
      resp => {
        if (resp.errors.length > 0) {
          console.log('res-status-setting // getSysResSettings // return errors', resp.errors);
          return;
        }
        let data = resp.data;
        this.sysResSettings = data.sysResSettings;
        console.log('Got sysResSettings', this.sysResSettings);
        //init
        this.colRes = this.sysResSettings.collectResGroup;
        this.colRes.txtEnabled = this.colRes.collectStatusEnable ? 'true' : 'false';
        console.log('colRes', this.colRes);
      },
      err => {
        console.log('res-status-setting // getSysResSettings // network error', err);
      }
    );
  }

  private validateSettings(): boolean {
    this.clRes.clResourcesEnabled = this.clRes.txtEnabled === 'true';
    this.colRes.collectStatusEnable = this.colRes.txtEnabled === 'true';
    console.log('validated adg settings: ', this.adgSettings);
    console.log('validated sys resource settings: ', this.sysResSettings);
    return true;
  }

  private showError(err, summary: string = 'Error') {
    if (CommonFunc.isString(err)) {
      this.msgSvc.add({ severity: 'error', summary: err });
      return;
    }
    let userMsg = err.userMessage;
    if (CommonFunc.isEmpty(userMsg)) {
      return;
    }
    if (err.raw) {
      this.trans.get(userMsg).subscribe(msg => {
        this.msgSvc.add({ severity: 'error', summary: msg });
      });
    } else {
      this.msgSvc.add({ severity: 'error', summary: userMsg });
    }
  }

  private showInfo(detail, summary: string = 'Information') {
    this.msgSvc.add({ severity: 'info', summary, detail });
  }
}
