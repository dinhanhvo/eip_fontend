import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, SelectItem, MessageService } from 'primeng/api';
import { AppConfigService } from '../../../app-config.service';
import { CommonAdApiService, CommonAdService, CommonFunc } from '../../../shared';

interface FmtRow {
  lang: string;
  setting?: Object;
}

const SETTING_MODULE = 'AD CORE';
const SETTING_GROUP = 'FORMATTING-STRATEGY';
const SETTING_NAME_PRE = 'ADC_FORMATTING_STRATEGY.';

@Component({
  selector: 'app-format-strategy',
  templateUrl: './format-strategy.component.html',
  styleUrls: ['./format-strategy.component.scss']
})
export class FormatStrategyComponent implements OnInit {
  fmtRows: FmtRow[] = [];
  siStrategies: SelectItem[] = [];

  constructor(
    private trans: TranslateService,
    private confirmSvc: ConfirmationService,
    private msgSvc: MessageService,
    private configSvc: AppConfigService,
    private adApiSvc: CommonAdApiService,
    private adSvc: CommonAdService
  ) {}

  ngOnInit() {
    this.init();
  }

  public onBtnOK() {
    this.confirmSvc.confirm({
      message: 'Are you sure to update format strategy configuration?',
      accept: () => {
        let settings = this.fmtRows.map(r => r.setting);
        this.adApiSvc.updateSettings(settings).subscribe(
          resp => {
            if (resp.errors.lenght > 0) {
              console.log('format-strategy // update // return errors', resp.errors);
              this.showError(resp.errors[0]);
              return;
            }
            this.showInfo('Success');
          },
          err => {
            console.log('format-strategy // update // network error', err);
            this.showError(err);
          }
        );
      },
      reject: () => {
        console.log('user rejected');
      }
    });
  }

  public onBtnCancel() {
    this.init();
  }

  private init() {
    //Load format strategies
    this.adApiSvc.getFmtStrategies().subscribe(
      resp => {
        if (resp.errors.lenght > 0) {
          console.log('format-strategy // load settings // return errors', resp.errors);
          return;
        }
        let data = resp.data;
        this.initFmtRows(data);
      },
      err => {
        console.log('format-strategy // load settings // network error', err);
      }
    );
  }

  private initFmtRows(fmtConf) {
    let avaiLangs: string[] = this.configSvc.getConfig('langs');
    // console.log('Supported langueges', avaiLangs);
    let strategies: string[] = fmtConf.strategies;
    if (strategies.length < 1) {
      console.log('For available formating strategy');
      return;
    }
    this.siStrategies = strategies.map(str => {
      return {
        label: str,
        value: str
      };
    });
    let settings: any[] = fmtConf.settings;
    // console.log('settings', settings);
    this.fmtRows = avaiLangs.map(lang => {
      let name = SETTING_NAME_PRE + lang.toUpperCase();
      let setting = settings.find(obj => obj.name === name);
      if (setting === undefined) {
        setting = this.adSvc.newUserSetting(SETTING_MODULE, SETTING_GROUP, name);
        setting.defaultValue = strategies[0];
      }
      if (CommonFunc.isEmpty(setting.value)) {
        setting.value = setting.defaultValue;
      }
      let row: FmtRow = {
        lang,
        setting
      };
      return row;
    });
    // console.log('fmtRows', this.fmtRows);
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
