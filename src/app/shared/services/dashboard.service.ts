import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BaseService } from './base.service';
import { CommonFunc } from '../utils/common-func';
// import { Sheet } from '../../domain';
import { TreeNode } from 'primeng/api';

const API_ADD_DASHBOAD: string = '/dashboard';
const API_MY_DASHBOARDS: string = '/me/dashboards';
const API_MY_OPENED_DASHBOARDS = '/me/opened-dashboards';
const API_DASHBOARD: string = '/dashboards/:id';
const API_DASHBOARD_DEPENDENCY: string = '/dashboards/:id/dependency';
const API_USER_DASHBOARDS: string = '/users/:userName/dashboards';

const API_DASHBOARD_WIDGET_DATA: string = '/dashboard/widgets/:id/data';
const API_DASHBOARD_WIDGET_SQL: string = '/dashboard/widgets/:id/sql';
const API_DASHBOARD_WIDGET_SERIALS: string = '/dashboard/widgets/:id/serials';
const API_DASHBOARD_ADD_SHEET_OBJECTS: string = '/dashboard/sheet/objects';
const API_DASHBOARD_ADD_SHEET: string = '/dashboard/sheet';
const API_DASHBOARD_ADD_WIDGET = '/dashboard/widget';
const API_DASHBOARD_CALC_FORMULA = '/dashboard/calcs/:caId/formula';
const API_DASHBOARD_EXPORT_EXCEL = '/dashboard/export-excel';
const API_DASHBOARD_FILTER_FORMULA = '/dashboard/filters/:id/formula';
const API_DASHBOARD_GLOBAL_CALS: string = '/dashboard/globalCalculations';
const API_DASHBOARD_OPEN_SHEET: string = '/dashboard/sheets/:sheetId/open';
const API_DASHBOARD_PARAM_LOV_CONS: string = '/dashboard/parameters/:paramId/LOVConditions';
const API_DASHBOARD_REMOVE_OBJECTS: string = '/dashboard/objects/remove';
const API_DASHBOARD_REMOVE_SHEET: string = '/dashboard/sheets/:sheetId';
const API_DASHBOARD_REMOVE_WIDGET: string = '/dashboard/widgets/:widgetId';
const API_DASHBOARD_LOV: string = '/dashboard/sheets/:sheetId/lov';
const API_DASHBOARD_SAVE_TRANS = '/dashboard/translations';

const API_DASHBOARD_SAVE: string = '/dashboard/save';
const API_DASHBOARD_SAVE_AS: string = '/dashboard/save-as';
const API_DASHBOARD_SAVE_AS_FILE: string = '/dashboard/save-as-file';
const API_DASHBOARD_UPDATE_CALC: string = '/dashboard/calc';
const API_DASHBOARD_UPDATE_CUSTOM_FOLDER: string = '/dashboard/custom-folder';
const API_DASHBOARD_UPDATE_FILTER: string = '/dashboard/filter';
const API_DASHBOARD_UPDATE_PARAMETER: string = '/dashboard/parameter';
const API_DASHBOARD_UPDATE_WIDGET: string = '/dashboard/widgets/:wgId/update';
const API_DASHBOARD_VALIDATE_OBJECTS: string = '/dashboard/validateObjects';
const API_DASHBOARD_SHEET_PARAM_VALUES: string = '/dashboard/sheets/:sheetId/paramValues';
const API_DASHBOARD_WIDGET_PARAM_VALUES: string = '/dashboard/widgets/:id/paramValues';
const API_DASHBOARD_GROUPS: string = '/dashboards/:id/adgroups';
const API_DASHBOARD_SHARING_UPDATE: string = '/dashboard/update-sharing';

const API_DASHBOARD_CONTENT: string = '/dashboards/:id/content';

// Get all workbook which has mass schedules
const API_DASHBOARD_MPSSHEDULES: string = '/dashboards/{id}/mpschedules';
const DEFAULT_MY_DASHBOARDS_BODY: Object = {
  fields: 'id,name,createdBy,updatedBy,updatedDate',
  filter: 'elementState==1',
  offset: 0,
  limit: 20,
  sort: '-createdDate'
};

const DEFAULT_FETCH_WG_DATA_BODY: Object = {
  page: 1
};

export interface DataObjectsType {
  scope?: string;
  data: any[];
}

export interface UpdateFilterType {
  id?: number;
  name?: string;
  autoName?: boolean;
  description?: string;
  expr: string;
  sheetId?: number;
  wbId?: number;
}

export interface UpdateDataType {
  id?: number;
  data: any;
  deep?: number;
}

export interface UpdateWidgetType {
  id?: number;
  type: string;
  path?: string;
  data: any;
  deep?: number;
}

export interface ExportExcelType {
  lang?: string;
  fileName?: string;
  ext?: string;
  widgetIds?: number[];
  params?: any;
  options?: any;
  timeout?: number;
}

export interface ExportExcelOpts {
  fullExport?: boolean;
  exportHeader?: boolean;
  statusPos?: string;
  statusTxt?: string;
  incHeaderRow?: boolean;
  wrapHeaderRow?: boolean;
  footer?: string;
  logoPath?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private defaultBody: any;
  public dataAcqusitionTreeNodes: TreeNode[];

  constructor(private baseService: BaseService) {}

  addDashboard() {
    return this.baseService.postData(API_ADD_DASHBOAD, {}).pipe(
      tap(
        resp => {
          // console.log('dashboard-service: got widget data', widgetId, resp);
        },
        err => {
          // console.log('dashboard-service: error fetching widget data', widgetId, err);
        }
      )
    );
  }

  addDataAcqusitionTreeNodes(treeNodes: TreeNode[]) {
    this.dataAcqusitionTreeNodes = treeNodes;
    console.log(treeNodes + ' have been added');
  }
  //хелло
  addSheet(sheet: any) {
    return this.baseService.postData(API_DASHBOARD_ADD_SHEET, sheet).pipe(
      tap(
        resp => {
          // console.log('dashboard-service: got widget data', widgetId, resp);
        },
        err => {
          // console.log('dashboard-service: error fetching widget data', widgetId, err);
        }
      )
    );
  }

  addSheetObjects(param: DataObjectsType): Observable<any> {
    return this.baseService.postData(API_DASHBOARD_ADD_SHEET_OBJECTS, param).pipe(tap(resp => {}, err => {}));
  }

  addWidget(sheetId: number, widget: any) {
    let url = CommonFunc.prepareUrl(API_DASHBOARD_ADD_WIDGET, { sheetId: sheetId });
    return this.baseService.postData(url, widget).pipe(
      tap(
        resp => {
          // console.log('dashboard-service: got widget data', widgetId, resp);
        },
        err => {
          // console.log('dashboard-service: error fetching widget data', widgetId, err);
        }
      )
    );
  }

  exportExcel(param: ExportExcelType): Observable<any> {
    let url = API_DASHBOARD_EXPORT_EXCEL;
    return this.baseService.postData(url, param).pipe(tap(resp => {}, err => {}));
  }

  fetchData(widgetId: number, body?: any): Observable<any> {
    if (body === undefined || body === null) {
      body = {};
    }
    const newBody = { ...DEFAULT_FETCH_WG_DATA_BODY, ...body };
    let url = CommonFunc.prepareUrl(API_DASHBOARD_WIDGET_DATA, { id: widgetId });
    return this.baseService.postData(url, newBody).pipe(
      tap(
        resp => {
          // console.log('dashboard-service: got widget data', widgetId, resp);
        },
        err => {
          // console.log('dashboard-service: error fetching widget data', widgetId, err);
        }
      )
    );
  }

  delDashboard(id: number, ignoreDependency: boolean) {
    let url = API_DASHBOARD;
    if (ignoreDependency) {
      url = API_DASHBOARD_DEPENDENCY;
    }
    url = CommonFunc.prepareUrl(url, { id });

    return this.baseService.deleteData(url).pipe(
      tap(
        resp => {
          //console.log('dashboard-service: got dashboard', resp);
        },
        error => {
          //console.log('dashboard-service: error getDashboard', error);
        }
      )
    );
  }

  getDashboard(id: number, body?: any): Observable<any> {
    if (body == null || body == undefined) {
      body = {};
    }
    const url = CommonFunc.prepareUrl(API_DASHBOARD, { id });
    return this.baseService.postData(url, body).pipe(
      tap(
        resp => {
          // console.log('dashboard-service: got dashboard', resp);
        },
        error => {
          //console.log('dashboard-service: error getDashboard', error);
        }
      )
    );
  }

  updateDashboard(id: number, wb?: any): Observable<any> {
    if (wb == null || wb == undefined) {
      console.log('empty wb');
      return;
    }
    const url = CommonFunc.prepareUrl(API_DASHBOARD, { id });
    return this.baseService.putData(url, wb).pipe(
      tap(
        resp => {
          // console.log('dashboard-service: got dashboard', resp);
        },
        error => {
          //console.log('dashboard-service: error getDashboard', error);
        }
      )
    );
  }

  getDashboardContent(id: number, body?: any): Observable<any> {
    if (body == null || body == undefined) {
      body = {};
    }
    let url = CommonFunc.prepareUrl(API_DASHBOARD_CONTENT, { id });
    return this.baseService.postData(url, body).pipe(
      tap(
        resp => {
          //console.log('dashboard-service: got dashbaord content', resp);
        },
        error => {
          //console.log('dashbaord-service: error getDashboardContent', id, error);
        }
      )
    );
  }

  getDashboards(body?: any): Observable<any> {
    if (body == null || body == undefined) {
      body = {};
    }
    const newBody = { ...DEFAULT_MY_DASHBOARDS_BODY, ...body };
    return this.baseService.postData(API_MY_DASHBOARDS, newBody).pipe(
      tap(
        resp => {
          //console.log('dashboard-service: got response data', resp);
        },
        error => {
          //console.log('dashboard-service: error fetching data', error);
        }
      )
    );
  }

  getMpDashboards(body?: any): Observable<any> {
    if (body == null || body == undefined) {
      body = {};
    }
    const newBody = { ...DEFAULT_MY_DASHBOARDS_BODY, ...body };

    let filter = newBody.filter;
    if (filter.length > 0) {
      filter += ';';
    }
    filter += 'mass==1';
    newBody.filter = filter;

    return this.baseService.postData(API_MY_DASHBOARDS, newBody).pipe(
      tap(
        resp => {
          //console.log('dashboard-service: got response data', resp);
        },
        error => {
          //console.log('dashboard-service: error fetching data', error);
        }
      )
    );
  }

  getCalcFormula(caId: number): Observable<any> {
    let body = {};
    let url = CommonFunc.prepareUrl(API_DASHBOARD_CALC_FORMULA, { caId });
    return this.baseService.postData(url, body).pipe(tap(resp => {}, err => {}));
  }

  getFilterFormula(filId: number, scope?: string): Observable<any> {
    let body = {};
    if (scope !== undefined && scope !== null) {
      body = {
        ...body,
        scope
      };
    }
    let url = CommonFunc.prepareUrl(API_DASHBOARD_FILTER_FORMULA, { id: filId });
    return this.baseService.postData(url, body).pipe(tap(resp => {}, err => {}));
  }

  getGlobalCalculations(body?: any): Observable<any> {
    return this.baseService.postData(API_DASHBOARD_GLOBAL_CALS, body).pipe(tap(resp => {}, err => {}));
  }

  getOpenedDashboards(): Observable<any> {
    let body = {};
    let url = API_MY_OPENED_DASHBOARDS;
    return this.baseService.postData(url, body).pipe(tap(resp => {}, err => {}));
  }

  getParameterLOVConditions(paramId: number): Observable<any> {
    let url = CommonFunc.prepareUrl(API_DASHBOARD_PARAM_LOV_CONS, { paramId: paramId });
    console.log('getParameterLOVConditions URL', url);
    return this.baseService.getData(url).pipe(tap(resp => {}, err => {}));
  }

  getWidgetSql(wgId: number): Observable<any> {
    let url = CommonFunc.prepareUrl(API_DASHBOARD_WIDGET_SQL, { id: wgId });
    return this.baseService.postData(url, {}).pipe(tap(resp => {}, err => {}));
  }

  getWidgetSerials(wgId: number): Observable<any> {
    let url = CommonFunc.prepareUrl(API_DASHBOARD_WIDGET_SERIALS, { id: wgId });
    return this.baseService.postData(url, {}).pipe(tap(resp => {}, err => {}));
  }

  openSheet(sheetId): Observable<any> {
    let url = CommonFunc.prepareUrl(API_DASHBOARD_OPEN_SHEET, { sheetId: sheetId });
    let body = {};
    return this.baseService.postData(url, body).pipe(tap(resp => {}, err => {}));
  }

  removeObjects(bos: any[], scope: string): Observable<any> {
    let body: DataObjectsType = {
      scope,
      data: [...bos]
    };
    return this.baseService.postData(API_DASHBOARD_REMOVE_OBJECTS, body);
  }

  removeSheet(sheetId: number): Observable<any> {
    let url = CommonFunc.prepareUrl(API_DASHBOARD_REMOVE_SHEET, { sheetId: sheetId });
    return this.baseService.deleteData(url);
  }

  removeWidget(sheetId: number, widgetId: number) {
    let url = CommonFunc.prepareUrl(API_DASHBOARD_REMOVE_WIDGET, { widgetId: widgetId });
    return this.baseService.deleteData(url).pipe(
      tap(
        resp => {
          // console.log('dashboard-service: got widget data', widgetId, resp);
        },
        err => {
          // console.log('dashboard-service: error fetching widget data', widgetId, err);
        }
      )
    );
  }

  save() {
    return this.baseService.postData(API_DASHBOARD_SAVE, {}).pipe(
      tap(
        resp => {
          //console.log('dashboard-service: save as', resp);
        },
        err => {
          //console.log('dashboard-service: save as', err);
        }
      )
    );
  }

  saveAs(name: string, override: boolean) {
    let body = {
      name: name,
      override: override
    };
    return this.baseService.postData(API_DASHBOARD_SAVE_AS, body).pipe(
      tap(
        resp => {
          //console.log('dashboard-service: save as', resp);
        },
        err => {
          //console.log('dashboard-service: save as', err);
        }
      )
    );
  }

  saveAsFile(includeMassPubWidget: boolean, includePdfTemplate: boolean) {
    let body = {
      includeMassPubWidget: includeMassPubWidget,
      includePdfTemplate: includePdfTemplate
    };
    return this.baseService.postData(API_DASHBOARD_SAVE_AS_FILE, body).pipe(
      tap(
        resp => {
          //console.log('dashboard-service: save as file', resp);
        },
        err => {
          //console.log('dashboard-service: save as file', err);
        }
      )
    );
  }

  updateCalculation(param: UpdateDataType): Observable<any> {
    return this.baseService.postData(API_DASHBOARD_UPDATE_CALC, param).pipe(tap(resp => {}, err => {}));
  }

  updateFilter(param: UpdateFilterType): Observable<any> {
    let url = API_DASHBOARD_UPDATE_FILTER;
    return this.baseService.postData(url, param).pipe(tap(resp => {}, err => {}));
  }

  updateParameter(param: UpdateDataType): Observable<any> {
    return this.baseService.postData(API_DASHBOARD_UPDATE_PARAMETER, param).pipe(tap(resp => {}, err => {}));
  }

  updateWidget(param: UpdateWidgetType): Observable<any> {
    let url = CommonFunc.prepareUrl(API_DASHBOARD_UPDATE_WIDGET, { wgId: param.id });
    //console.log('udpateWidget:url', url);
    return this.baseService.postData(url, param).pipe(
      tap(
        resp => {
          //console.log('dashboard-service: update widget result', resp);
        },
        err => {
          //console.log('dashboard-service: error update widget', err);
        }
      )
    );
  }

  widgetParamsValues(widgetId: number, wbId?: any): Observable<any> {
    let body = {};
    if (wbId !== undefined && wbId !== null) {
      body = {
        ...body,
        scope: 'dashboards/' + wbId
      };
    }
    const newBody = { ...body };
    let url = CommonFunc.prepareUrl(API_DASHBOARD_WIDGET_PARAM_VALUES, { id: widgetId });
    return this.baseService.postData(url, newBody).pipe(
      tap(
        resp => {
          // console.log('dashboard-service: got widget data', widgetId, resp);
        },
        err => {
          // console.log('dashboard-service: error fetching widget data', widgetId, err);
        }
      )
    );
  }

  getUserDashboards(userName: String, body?: any): Observable<any> {
    if (body == null) {
      body = {};
    }
    let url = CommonFunc.prepareUrl(API_USER_DASHBOARDS, { userName: userName });
    return this.baseService.postData(url, body).pipe(tap(resp => {}, error => {}));
  }

  getDashboardAdGroups(id: number): Observable<any> {
    let url = CommonFunc.prepareUrl(API_DASHBOARD_GROUPS, { id });
    return this.baseService.getData(url).pipe(tap(resp => {}, err => {}));
  }

  getDashboardsWithMassSchedules(body?: any): Observable<any> {
    if (body == null) {
      body = {};
    }
    const newBody = { ...DEFAULT_MY_DASHBOARDS_BODY, ...body };
    return this.baseService.postData(API_DASHBOARD_MPSSHEDULES, newBody).pipe(
      tap(
        resp => {
          console.log('dashboard-service: got response data', resp);
        },
        error => {
          console.log('dashboard-service: error fetching data', error);
        }
      )
    );
  }

  updateWbSharing(body?: any): Observable<any> {
    return this.baseService.postData(API_DASHBOARD_SHARING_UPDATE, body).pipe(tap(resp => {}, error => {}));
  }

  validateObjects(objs: any[], wgId?: number): Observable<any> {
    let param: DataObjectsType = {
      scope: 'sheet',
      data: objs
    };
    if (wgId) {
      param.scope = 'sheet/' + wgId;
      // let param: DataObjectsType = {
      //   scope: 'sheet/' + wgId,
      //   data: objs
      // };
    }
    return this.baseService.postData(API_DASHBOARD_VALIDATE_OBJECTS, param).pipe(tap(resp => {}, err => {}));
  }

  addLOV(sheetId: number, lov: any): Observable<any> {
    let url = CommonFunc.prepareUrl(API_DASHBOARD_LOV, { sheetId });
    return this.baseService.postData(url, lov).pipe(tap(resp => {}, err => {}));
  }

  updateLOV(sheetId: number, lov: any) {
    let url = CommonFunc.prepareUrl(API_DASHBOARD_LOV, { sheetId });
    return this.baseService.postData(url, lov).pipe(tap(resp => {}, err => {}));
  }

  updateParamValues(sheetId: number, params: any[]) {
    let url = CommonFunc.prepareUrl(API_DASHBOARD_SHEET_PARAM_VALUES, { sheetId });
    let body = {};
    for (let p of params) {
      body[p.boId] = p.value;
    }
    return this.baseService.putData(url, body).pipe(tap(resp => {}, err => {}));
  }

  updateCustomFolder(sheetId: number, folder: any) {
    let url = CommonFunc.prepareUrl(API_DASHBOARD_UPDATE_CUSTOM_FOLDER, {});
    let body: DataObjectsType = {
      scope: `sheet/${sheetId}`,
      data: [folder]
    };
    return this.baseService.postData(url, body).pipe(tap(resp => {}, err => {}));
  }

  saveTranslations(objs: any[]): Observable<any> {
    let url = CommonFunc.prepareUrl(API_DASHBOARD_SAVE_TRANS, {});
    let body: DataObjectsType = {
      scope: 'wb',
      data: [...objs]
    };
    return this.baseService.putData(url, body);
  }
}
