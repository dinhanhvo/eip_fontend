import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppStore, AppStoreService } from './app-store.service';
import { DateService } from './date.util.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Weigh } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class WeighService {

  options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  constructor(
    private http: HttpClient,
    private appStore: AppStoreService,
    private dateSvc: DateService
  ) {
  }

  getAllWeighs(): Observable<any> {
    const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/weighs';

    // return this.http.get<any>('assets/data/weighs.json').pipe(
    return this.http.get<any>(url, this.options).pipe(
      tap(
        data => {
          // console.log(data.weighs);
        },
        error => {
          // console.log('weigh-service: error', error);
        }
      )
    );
  }

  getWeighsByUser(id): Observable<any> {
    const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/weighs/user/' + id;

    // return this.http.get<any>('assets/data/weighs.json').pipe(
    return this.http.get<any>(url, this.options).pipe(
      tap(
        data => {
          console.log('prs type: ' + id, data.weighs);
        },
        error => {
          console.log('weigh-service: error', error);
        }
      )
    );
  }

  getWeighsByCate(serial): Observable<any> {
    const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/weighs/serial/' + serial;

    // return this.http.get<any>('assets/data/weighs.json').pipe(
    return this.http.get<any>(url, this.options).pipe(
      tap(
        data => {
          console.log('serial weighs: ' + serial, data.weighs);
        },
        error => {
          console.log(' weigh-service: error', error);
        }
      )
    );
  }

  addWeigh(weigh: Weigh): Observable<any> {
    console.log('insert weigh: ', weigh);
    const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/weigh';
    const body = {
      'weigh': weigh
      // 'categories': cates
    };

    return this.http.post(url, body, this.options).pipe(
      tap(
        data => {
          console.log('got response data', data);
        },
        error => {
          console.log('login error', error);
        }
      )
    );
  }

  deleteWeigh(id): Observable<any> {
    console.log(' weigh delete: ', id);
    const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/weigh/' + id;
    return this.http.delete(url).pipe(
      tap(
        data => {
          console.log('got response data', data);
        },
        error => {
          console.log('login error', error);
        }
      )
    );
  }
}
