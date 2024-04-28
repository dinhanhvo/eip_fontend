import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CommonFunc } from '../utils';

const API_ADGROUPS = '/adgroups';

const API_ADG_SETTINGS = '/settings';
const API_ADG_SYS_RES_SETTINGS = '/setting/system-resources';
const API_UPDATE_SETTINGS = '/settings';
const API_SAVE_SETTINGS = '/save-settings';
const API_TEST_AD_DB = '/test-connection/adDb';
const API_TEST_IMX_DB = '/test-connection/imxDb';
const API_TEST_IMX_SERVER = '/test-connection/imxServer';
const API_TEST_SMTP = '/test-connection/smtp';

const API_BAS = '/bas';
const API_BA_FOLDERS = '/bas/:baId/folders';
const API_COUNTRIES = '/countries';
const API_CURRENCIES = '/currencies';
const API_DATE_FORMAT = '/me/dateformat';
const API_DATE_FORMATS = '/me/dateformats';
const API_DOWNLOAD = '/download';
const API_FOLDERS = '/folders';
const API_FOLDER_CONTENT = '/folders/:folId/content';
const API_FOLDER_ITEMS = '/folders/:folId/items';
const API_FOLDER_JOINS = '/folders/:folId/joins';
const API_ITEMS_FROM_SQL = '/items/from/sql';
const API_FUNCTIONS = '/functions';
const API_FUNCTION_EXPR = '/functions/:id/expr';
const API_GET_BOID = '/boId';
const API_IMAGES = '/images';
const API_IMX_USERS = '/imx/users';
const API_ITEMS = '/items';
const API_LOGOS = '/logos';
const API_LOV_VALUES = '/lovValuesBySql';
const API_PUBLICATION_INFO = '/publication-info';
const API_SQL_PLANS = '/sql/plans';
const API_SIGNATURES = '/signatures';
const API_SYSTEM_INFO = '/system-info';
const API_VERSION = '/version';
const API_GET_DATA = '/get-data/:ref';
const API_FMT_STRATEGIES = '/format-strategies';
const API_GET_TRANSLATIONS = '/translations';

export interface QueryObjectsType {
  filter?: string;
  offset?: number;
  limit?: number;
  sort?: string;
}

export interface GetTranslationsType {
  groupId?: number;
  objectId?: number;
  objectType?: number;
  key?: string;
  lang?: string;
}

const DEFAULT_BODY: QueryObjectsType = {
  filter: 'elementState==1',
  offset: 0,
  limit: 200,
  sort: '+name'
};

@Injectable({
  providedIn: 'root'
})
export class CommonAdApiService {
  constructor(private baseSvc: BaseService) {}

  public getBas(body?: any): Observable<any> {
    if (body === undefined || body === null) {
      body = {};
    }
    let newBody = { ...DEFAULT_BODY, ...body };
    return this.baseSvc.postData(API_BAS, newBody).pipe(tap(resp => {}, err => {}));
  }

  public getConditionFunctions(): Observable<any> {
    let body = {
      filter: 'conditional==*'
    };
    let newBody = {
      ...DEFAULT_BODY,
      ...body
    };
    return this.baseSvc.postData(API_FUNCTIONS, newBody).pipe(tap(resp => {}, err => {}));
  }

  public getCountries(): Observable<any> {
    let body = {};
    return this.baseSvc.postData(API_COUNTRIES, body).pipe(tap(resp => {}, err => {}));
  }

  public getCurrencies(): Observable<any> {
    let body = {};
    return this.baseSvc.postData(API_CURRENCIES, body).pipe(tap(resp => {}, err => {}));
  }

  public getDateFormat(pattern: string): Observable<any> {
    let body = {
      pattern
    };
    return this.baseSvc.postData(API_DATE_FORMAT, body).pipe(tap(resp => {}, err => {}));
  }

  public getDateFormats(): Observable<any> {
    return this.baseSvc.getData(API_DATE_FORMATS).pipe(tap(resp => {}, err => {}));
  }

  public getBaFolders(baId: number, search?: string): Observable<any> {
    let body = {
      filter: 'elementState==1'
    };
    if (!CommonFunc.isEmpty(search)) {
      body = {
        ...body,
        filter: body.filter + ',name==*' + search + '*'
      };
    }
    let url = CommonFunc.prepareUrl(API_BA_FOLDERS, { baId });
    return this.baseSvc.postData(url, body).pipe(tap(resp => {}, err => {}));
  }

  public getNameFolders(folderIds: any[]) {
    let body = {
      fields: 'name',
      filter: 'elementState==1'
    };
    if (!CommonFunc.isEmpty(folderIds)) {
      body = {
        ...body,
        filter: body.filter + ' and  id=in=(' + folderIds.join(',') + ')'
      };
    }
    return this.baseSvc.postData(API_FOLDERS, body).pipe(tap(resp => {}, err => {}));
  }

  public getFolderItems(folId: number, search?: string, limit?: number): Observable<any> {
    let body = {};
    let filter = '';
    if (CommonFunc.isString(search)) {
      filter += 'name==*' + search + '*';
    }
    if (filter.length > 0) {
      body = {
        ...body,
        filter
      };
    }
    if (!CommonFunc.isNumber(limit)) {
      limit = 500;
    }
    body = {
      ...body,
      limit
    };
    let url = CommonFunc.prepareUrl(API_FOLDER_ITEMS, { folId });
    return this.baseSvc.postData(url, body).pipe(tap(resp => {}, err => {}));
  }

  public getFolderJoins(folId: number, search?: string, limit?: number): Observable<any> {
    let body = {};
    let filter = '';
    if (CommonFunc.isString(search)) {
      filter += 'name==*' + search + '*';
    }
    if (filter.length > 0) {
      body = {
        ...body,
        filter
      };
    }
    if (!CommonFunc.isNumber(limit)) {
      limit = 500;
    }
    body = {
      ...body,
      limit
    };
    let url = CommonFunc.prepareUrl(API_FOLDER_JOINS, { folId });
    return this.baseSvc.postData(url, body).pipe(tap(resp => {}, err => {}));
  }

  public getFormulaFunctions(): Observable<any> {
    let body = {
      filter: 'formula==*'
    };
    let newBody = {
      ...DEFAULT_BODY,
      ...body
    };
    return this.baseSvc.postData(API_FUNCTIONS, newBody).pipe(tap(resp => {}, err => {}));
  }

  public getFunctionExpr(fnId: number): Observable<any> {
    let body = {};
    let url = CommonFunc.prepareUrl(API_FUNCTION_EXPR, { id: fnId });
    return this.baseSvc.postData(url, body).pipe(tap(resp => {}, err => {}));
  }

  public getImxUsers(search: string, scope: string = 'all'): Observable<any> {
    let body = {
      scope,
      params: {
        filter: search
      }
    };
    return this.baseSvc.postData(API_IMX_USERS, body).pipe(tap(resp => {}, err => {}));
  }

  public getItems(body?: any): Observable<any> {
    if (body === undefined || body === null) {
      body = {};
    }
    let newBody = { ...DEFAULT_BODY, ...body };
    return this.baseSvc.postData(API_ITEMS, newBody).pipe(tap(resp => {}, err => {}));
  }

  public getItemsFromSql(query: string): Observable<any> {
    return this.baseSvc.postData(API_ITEMS_FROM_SQL, { data: query }).pipe(tap(resp => {}, err => {}));
  }

  public getSQLPlan(query: string): Observable<any> {
    return this.baseSvc.postData(API_SQL_PLANS, { data: query }).pipe(tap(resp => {}, err => {}));
  }

  public getLogos(): Observable<any> {
    return this.baseSvc.postData(API_LOGOS, {}).pipe(tap(resp => {}, err => {}));
  }

  public getSignatures(): Observable<any> {
    return this.baseSvc.postData(API_SIGNATURES, {}).pipe(tap(resp => {}, err => {}));
  }

  public getLovValuesBySql(body?: any): Observable<any> {
    return this.baseSvc.postData(API_LOV_VALUES, body).pipe(tap(resp => {}, err => {}));
  }

  public getNonNumericAggFuns(): Observable<any> {
    let body = {
      filter: 'nonNumericAgg==*'
    };
    let newBody = {
      ...DEFAULT_BODY,
      ...body
    };
    return this.baseSvc.postData(API_FUNCTIONS, newBody).pipe(tap(resp => {}, err => {}));
  }

  public getNumericAggFuns(): Observable<any> {
    let body = {
      filter: 'numericAgg==*'
    };
    let newBody = {
      ...DEFAULT_BODY,
      ...body
    };
    return this.baseSvc.postData(API_FUNCTIONS, newBody).pipe(tap(resp => {}, err => {}));
  }

  public getVersion(): Observable<any> {
    let body = {};
    return this.baseSvc.postData(API_VERSION, body).pipe(tap(resp => {}, err => {}));
  }

  public getAdGroups(): Observable<any> {
    return this.baseSvc.getData(API_ADGROUPS).pipe(tap(resp => {}, err => {}));
  }

  public loadFolder(folId: number): Observable<any> {
    let body = {};
    let url = CommonFunc.prepareUrl(API_FOLDER_CONTENT, { folId });
    return this.baseSvc.postData(url, body).pipe(tap(resp => {}, err => {}));
  }

  public getBoId(): Observable<any> {
    let body = {};
    return this.baseSvc.postData(API_GET_BOID, body).pipe(tap(resp => {}, err => {}));
  }

  public getLogoUrl(file: string) {
    return this.baseSvc.getUrlWithToken(API_IMAGES + '/' + file) + '&type=logo';
  }

  public getSignatureUrl(file: string) {
    return this.baseSvc.getUrlWithToken(API_IMAGES + '/' + file) + '&type=signature';
  }

  public getDownloadUrl(file: string) {
    return this.baseSvc.getUrlWithToken(API_DOWNLOAD) + '&delete=true&type=export&file=' + encodeURI(file);
  }

  public getPublicationInfo() {
    return this.baseSvc.getData(API_PUBLICATION_INFO).pipe(tap(resp => {}, err => {}));
  }

  public getSystemInfo() {
    return this.baseSvc.getData(API_SYSTEM_INFO).pipe(tap(resp => {}, err => {}));
  }

  public getData(ref: string, contentType: string): Observable<any> {
    let body = {
      contentType
    };
    let url = CommonFunc.prepareUrl(API_GET_DATA, { ref });
    return this.baseSvc.postData(url, body);
  }

  public getFmtStrategies(): Observable<any> {
    let url = API_FMT_STRATEGIES;
    let body = {};
    return this.baseSvc.postData(url, body);
  }

  public getAdgSettings(body?: any): Observable<any> {
    if (body === undefined || body === null) {
      body = {};
    }
    let url = API_ADG_SETTINGS;
    return this.baseSvc.postData(url, body).pipe();
  }

  public getSysResSettings(body?: any): Observable<any> {
    if (body === undefined || body === null) {
      body = {};
    }
    let url = API_ADG_SYS_RES_SETTINGS;
    return this.baseSvc.postData(url, body).pipe();
  }

  public updateSettings(settings: any[]): Observable<any> {
    let body = {
      data: settings
    };
    return this.baseSvc.putData(API_UPDATE_SETTINGS, body);
  }

  public saveSettings(objs: any[]): Observable<any> {
    let body = {
      data: objs
    };
    return this.baseSvc.putData(API_SAVE_SETTINGS, body);
  }

  public getTranslations(opts: GetTranslationsType): Observable<any> {
    let url = CommonFunc.prepareUrl(API_GET_TRANSLATIONS, {});
    let body: QueryObjectsType = {
      ...DEFAULT_BODY,
      sort: undefined
    };
    let filter = body.filter;
    if (!CommonFunc.isEmpty(opts.groupId)) {
      filter += ';groupId==' + opts.groupId;
    }
    if (!CommonFunc.isEmpty(opts.objectId)) {
      filter += ';objectId==' + opts.objectId;
    }
    if (!CommonFunc.isEmpty(opts.objectType)) {
      filter += ';objectType==' + opts.objectType;
    }
    if (!CommonFunc.isEmpty(opts.key)) {
      filter += ';key==' + opts.key;
    }
    if (!CommonFunc.isEmpty(opts.lang)) {
      filter += ';lang==' + opts.lang;
    }
    body.filter = filter;
    return this.baseSvc.postData(url, body);
  }

  public testAdDb(): Observable<any> {
    return this.baseSvc.getData(API_TEST_AD_DB).pipe();
  }

  public testImxDb(): Observable<any> {
    return this.baseSvc.getData(API_TEST_IMX_DB).pipe();
  }

  public testImxServer(): Observable<any> {
    return this.baseSvc.getData(API_TEST_IMX_SERVER).pipe();
  }

  public testSmtp(emailAddress: string): Observable<any> {
    return this.baseSvc.postData(API_TEST_SMTP, { data: emailAddress }).pipe();
  }
}
