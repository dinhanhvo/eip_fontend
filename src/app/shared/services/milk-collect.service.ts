import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppStore, AppStoreService } from './app-store.service';
import { DateService } from './date.util.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})

export class MilkCollectService {

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

  getAllMilkCollects(): Observable<any> {
    const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/milks';

    // return this.http.get<any>('assets/data/milkcollectts.json').pipe(
    return this.http.get<any>(url, this.options).pipe(
      tap(
        data => {
          // console.log(data.milkcollectts);
        },
        error => {
          // console.log('milkcollectt-service: error', error);
        }
      )
    );
  }

  getMilkCollectsByUser(id): Observable<any> {
    const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/milks/user/' + id;

    // return this.http.get<any>('assets/data/milkcollectts.json').pipe(
    return this.http.get<any>(url, this.options).pipe(
      tap(
        data => {
          console.log('prs type: ' + id, data.milkcollectts);
        },
        error => {
          console.log('milkcollectt-service: error', error);
        }
      )
    );
  }

  getMilkCollectByCan(serial: string, tkfrom: Date, tkto: Date): Observable<any> {
    let from = DateService.newUTCDate(tkfrom);
    let to = DateService.newUTCDate(tkto);
    const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/milks?serialWeigh='
       + serial + '&from=' + from.toISOString() + '&to=' + to.toISOString();
    return this.http.get<any>(url, this.options).pipe(
      tap(
        data => {
          console.log(data);
        },
        error => {
          console.log(' getMilkCollectByCan error: ', error);
        }
      )
    );
  }

    getMilkCollectByDate(tkfrom: Date, tkto: Date): Observable<any> {
        let from = DateService.newUTCDate(tkfrom);
        let to = DateService.newUTCDate(tkto);
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/milks/dates?from='
             + from.toISOString() + '&to=' + to.toISOString();
        return this.http.get<any>(url, this.options).pipe(
            tap(
                data => {
                    console.log(data);
                },
                error => {
                    console.log(' getMilkCollectByCan error: ', error);
                }
            )
        );
    }
}
