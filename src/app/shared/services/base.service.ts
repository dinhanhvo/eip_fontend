import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppStoreService, AppStore } from './app-store.service';
@Injectable({
  providedIn: 'root'
})
export class BaseService {
  defaultOptions: any = {};
  // paramToken: string = '';
  constructor(private http: HttpClient, private appStore: AppStoreService) {
    // let token = appStore.getAuth()['token'];
    // this.paramToken = `/?token=${token}`;
    // let token = this.appStore.getAuth()['token'];
    this.defaultOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        // 'Authorization': 'Bearer ' + token
      })
    };
  }

  public deleteData(url: string): Observable<any>;
  public deleteData(url: string, options?: any): Observable<any> {
    url = this.appStore.getData(AppStore.PROFILE, {}).api + url + this.paramToken();
    let opts = null;
    if (options == null || typeof options === 'undefined') {
      opts = this.defaultOptions;
    } else {
      opts = {
        ...this.defaultOptions,
        ...options
      };
    }
    return this.http.delete<any>(url, opts);
  }

  public getData(url: string): Observable<any>;
  public getData(url: string, options: any): Observable<any>;
  public getData(url: string, options?: any): Observable<any> {
    url = this.appStore.getData(AppStore.PROFILE, {}).api + url; //  + this.paramToken()
    if (options == null || typeof options === 'undefined') {
      options = this.defaultOptions;
    } 
    console.log('GET========== options: ', options);
    
    return this.http.get<any>(url, options);
  }

  public postData(url: string, body: any): Observable<any>;
  public postData(url: string, body: any, options: any): Observable<any>;
  public postData(url: string, body: any, options?: any): Observable<any> {
    url = this.appStore.getData(AppStore.PROFILE, {}).api + url; // + this.paramToken()
    if (options == null) {
      options = this.defaultOptions;
    }
    return this.http.post<any>(url, body, options);
  }

  public putData(url: string, body: any, options?: any): Observable<any> {
    let sendUrl = this.appStore.getData(AppStore.PROFILE, {}).api + url + this.paramToken();
    let sendOpts = {
      ...this.defaultOptions,
      ...options
    };
    // console.log('calling http put', sendUrl);
    return this.http.put<any>(sendUrl, body, sendOpts);
  }

  public getUrlWithToken(url: string) {
    let sendUrl = this.appStore.getData(AppStore.PROFILE, {}).api + url + this.paramToken();
    return sendUrl;
  }

  public getDownloadUrl(dType: string, dRef: string) {
    let url: string = '/download?type=' + dType + '&file=' + dRef;
    let res = this.appStore.getData(AppStore.PROFILE, {}).api;
    let token = this.appStore.getAuth()['token'];
    res += url + '&token=' + token;
    return res;
  }

  private paramToken(): string {
    let token = this.appStore.getAuth()['token'];
    return `?token=${token}`;
  }
}
