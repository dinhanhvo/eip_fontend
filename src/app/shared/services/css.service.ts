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

export class CSSService {

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

    getAllCSS(): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/stylesheets';

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

    getCSS(id): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/stylesheet/' + id;

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

    addCSS(cate): Observable<any>  {
        console.log('insert cate: ', cate);
        // url="http://localhost:8089/api/upload"
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/stylesheet';

        return this.http.post(url, cate, jsonOptions).pipe(
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

    editCSS(cate): Observable<any> {
        console.log('insert prod: ', cate);
        // url="http://localhost:8089/api/upload"
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/stylesheet';
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

    deleteCSS(id): Observable<any> {
        console.log(' cate delete: ', id);
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/stylesheet/' + id;
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