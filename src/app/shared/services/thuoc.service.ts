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

export class ThuocService {

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

    getAllThuocs(): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/thuocs';

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

    getThuoc(id): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/thuoc/' + id;

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

    getThuocsByType(id): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/thuocs/type/' + id;
        // return this.http.get<any>('assets/data/thuocs.json').pipe(
        return this.http.get<any>(url, this.options).pipe(
            tap(
                data => { 
                    console.log('prs type: '+ id, data.thuocs);
                },
                error => {
                    console.log('thuoc-service: error', error);
                }
            )
        );
    }

    getThuocsByTypeAndKho(id, khoId): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/thuocs/type/' + id +'/kho/' + khoId;
        return this.http.get<any>(url, this.options).pipe(
            tap(
                data => {
                    console.log('prs type: '+ id, data.thuocs);
                },
                error => {
                    console.log('thuoc-service: error', error);
                }
            )
        );
    }

    getThuocsByKBAndKho(khoId): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/thuocs/khambenh/kho/' + khoId;
        return this.http.get<any>(url, this.options).pipe(
            tap(
                data => {
                    console.log('prs khoId: '+ khoId, data.thuocs);
                },
                error => {
                    console.log('thuoc-service: error', error);
                }
            )
        );
    }

    getThuocsByCate(id): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/thuocs/category/' + id;

        // return this.http.get<any>('assets/data/thuocs.json').pipe(
        return this.http.get<any>(url, this.options).pipe(
            tap(
                data => {
                    console.log('prs cate: '+ id, data.thuocs);
                },
                error => {
                    console.log('cate thuoc-service: error', error);
                }
            )
        );
    }

    getImgsThuoc(id): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/thuoc/imgs/' + id;

        // return this.http.get<any>('assets/data/thuocs.json').pipe(
        return this.http.get<any>(url, this.options).pipe(
            tap(
                data => {
                    console.log('imgs: ', data);
                },
                error => {
                    // console.log('thuoc-service: error', error);
                }
            )
        );
    }

    addThuoc(thuoc): Observable<any> {
        // console.log('insert thuoc: ', thuoc);
        // url="http://localhost:8089/api/upload"
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/thuoc';
        // let cates = [...thuoc.categories];
        // thuoc.categorys.push(thuoc.categories);
        // thuoc.categories = null;
        const body = {
            'prod': thuoc
            // 'categories': cates
        };

        return this.http.post(url, thuoc, jsonOptions).pipe(
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

    addThuocs(thuocs): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/thuocs';
        const body = {
            'prod': thuocs
        };

        return this.http.post(url, thuocs, jsonOptions).pipe(
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

    editThuoc(prod): Observable<any> {
        console.log('insert prod: ', prod);
        // url="http://localhost:8089/api/upload"
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/thuoc';
        return this.http.put(url, prod, jsonOptions).pipe(
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

    
    deleteThuoc(id): Observable<any> {
        console.log(' thuoc delete: ', id);
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/thuoc/' + id;
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