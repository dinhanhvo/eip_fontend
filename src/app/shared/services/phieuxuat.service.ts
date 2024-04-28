import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AppStoreService, AppStore } from '../../shared/services/app-store.service';
import { log } from 'util';

const jsonOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root'
})

export class PhieuxuatService {

    options = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        }),
    };
    constructor(
        private http: HttpClient,
        private appStore: AppStoreService
    ) {

    }

    getAllPhieuxuats(): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/phieuxuats';

        // return this.http.get<any>('assets/data/products.json').pipe(
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

    getPhieuxuatsTieuhao(): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/xuattieuhaos';
            // + 'type=' + type;
        // return this.http.get<any>('assets/data/thuocs.json').pipe(
        return this.http.get<any>(url, this.options).pipe(
            tap(
                data => {
                    // console.log(data.thuocs);
                },
                error => {
                    // console.log('thuoc-service: error', error);
                }
            )
        );
    }

    getPhieuxuatByDates(from: Date, to: Date): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/phieuxuats/dates?'
            + 'from=' + from.toUTCString() + '&to=' + to.toUTCString();
        // return this.http.get<any>('assets/data/thuocs.json').pipe(
        return this.http.get<any>(url, this.options).pipe(
            tap(
                data => {
                    // console.log(data.thuocs);
                },
                error => {
                    // console.log('thuoc-service: error', error);
                }
            )
        );
    }

    getPhieuxuatByKhoAndDates(from: Date, to: Date, kho: string): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/phieuxuats/kho/dates?'
            + 'from=' + from.toUTCString() + '&to=' + to.toUTCString() + '&kho=' + kho;
        // return this.http.get<any>('assets/data/thuocs.json').pipe(
        return this.http.get<any>(url, this.options).pipe(
            tap(
                data => {
                    // console.log(data.thuocs);
                },
                error => {
                    // console.log('thuoc-service: error', error);
                }
            )
        );
    }

    getPhieuxuatByKhuAndDates(from: Date, to: Date, khu: string): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/phieuxuats/khu/dates?'
            + 'from=' + from.toUTCString() + '&to=' + to.toUTCString() + '&khu=' + khu;
        // return this.http.get<any>('assets/data/thuocs.json').pipe(
        return this.http.get<any>(url, this.options).pipe(
            tap(
                data => {
                    // console.log(data.thuocs);
                },
                error => {
                    // console.log('thuoc-service: error', error);
                }
            )
        );
    }

    getPhieuxuat(id): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/phieuxuat/' + id;

        // return this.http.get<any>('assets/data/products.json').pipe(
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

    addPhieuxuat(cate): Observable<any> {
        console.log('insert phieuxuat: ', cate);
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/phieuxuat';

        return this.http.post(url, cate, jsonOptions).pipe(
            tap(
                data => {
                    console.log('got phieuxuat response data', data);
                },
                error => {
                    console.log('phieuxuat error', error);
                }
            )
        );
    }

    editPhieuxuat(cate): Observable<any> {
        console.log('insert prod: ', cate);
        // url="http://localhost:8089/api/upload"
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/phieuxuat';
        return this.http.put(url, cate, jsonOptions).pipe(
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

    deletePhieuxuat(id): Observable<any> {
        console.log(' cate delete: ', id);
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/phieu/' + id;
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