import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BaseService } from './base.service';
import { CommonFunc } from '../utils';
import { AppStoreService, AppStore } from './app-store.service';

const API_USER_PRIVILEGES: string = '/me/dashboards/privileges';
const API_USER_WB_PRIVILEGES: string = '/me/dashboards/:wbId/privileges';
const API_USERS: string = '/users';
const API_USER_PROFILE: string = '/users/username?username=';
const DEFAULT_BODY: Object = {
  fields: 'id,name,createdBy,updatedBy,updatedDate',
  filter: 'elementState==1',
  offset: 0,
  limit: 20,
  sort: '-createdDate'
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  options = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    }),
};
  constructor(private baseService: BaseService,
    private http: HttpClient,
    private appStore: AppStoreService,
  ) { }

  getUserPrivileges(wbId?: any) {
    let url = '';
    if (wbId) {
      url = CommonFunc.prepareUrl(API_USER_WB_PRIVILEGES, { wbId: wbId });
    } else {
      url = API_USER_PRIVILEGES;
    }
    return this.baseService.getData(url).pipe(
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

  getUsers(body?: any): Observable<any> {
    if (body == null) {
      body = {};
    }
    const newBody = { ...DEFAULT_BODY, ...body };
    const tk = localStorage.getItem('token');
    return this.baseService.postData(API_USERS, newBody).pipe(
      tap(resp => { }, err => { }));
  }

  getUserProfile(username: string): Observable<any> {
    const url = this.appStore.getData(AppStore.PROFILE, {}).api +  API_USER_PROFILE + username
    return this.http.get<any>(url, this.options).pipe(
      tap(
          data => {
              // console.log(data.products);
          },
          error => {
              // console.log('product-service: error', error);
          }
      )
  );
  }

  
}
