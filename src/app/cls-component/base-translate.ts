import { Subscription } from 'rxjs';
import { AppStoreService, AppStore } from '../shared';
import { BaseComponent } from './base-component';
// import { BaseBo } from '../domain';
export class BaseTranslate extends BaseComponent {
  public lang: string;
  subscriptions: Subscription[];
  constructor(protected appStore: AppStoreService) {
    super();
    this.lang = this.appStore.getData(AppStore.LANG, 'en');
  }

  public getTransName(baseBO: any, defVal: string) {
    return '';
  }
}
