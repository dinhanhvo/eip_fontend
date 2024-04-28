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

export class ProductsService {

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

    getAllproducts(): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/products';

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

    getProduct(id): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/product/' + id;

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

    getProductsByType(id): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/products/type/' + id;

        // return this.http.get<any>('assets/data/products.json').pipe(
        return this.http.get<any>(url, this.options).pipe(
            tap(
                data => {
                    console.log('prs type: '+ id, data.products);
                },
                error => {
                    console.log('product-service: error', error);
                }
            )
        );
    }

    getProductsByCate(id): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/products/category/' + id;

        // return this.http.get<any>('assets/data/products.json').pipe(
        return this.http.get<any>(url, this.options).pipe(
            tap(
                data => {
                    console.log('prs cate: '+ id, data.products);
                },
                error => {
                    console.log('cate product-service: error', error);
                }
            )
        );
    }

    getImgsProduct(id): Observable<any> {
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/product/imgs/' + id;

        // return this.http.get<any>('assets/data/products.json').pipe(
        return this.http.get<any>(url, this.options).pipe(
            tap(
                data => {
                    console.log('imgs: ', data);
                },
                error => {
                    // console.log('product-service: error', error);
                }
            )
        );
    }

    addProduct(prod) {
        console.log('insert prod: ', prod);
        // url="http://localhost:8089/api/upload"
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/product';
        const body = {
            'prod': prod
        };

        return this.http.post(url, prod, jsonOptions).pipe(
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

    editProduct(prod) {
        console.log('insert prod: ', prod);
        // url="http://localhost:8089/api/upload"
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/product';
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

    uploadFile(fileToUpload: File): Observable<any> {
        // url="http://localhost:8089/api/upload"
        const url = this.appStore.getData(AppStore.PROFILE, {}).api + '/upload';

        const formData: FormData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);

        return this.http.post(url, formData).pipe(
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