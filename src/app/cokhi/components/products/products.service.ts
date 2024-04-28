import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class ProductsService {
    constructor(
        private http: HttpClient
    ) {

    }

    getAllproducts(): Observable<any> {
        return this.http.get<any>('assets/data/products.json').pipe(
            tap(
                data => {
                    // console.log(data.products);
                },
                error => {
                    // console.log('product-service: error', error);
                }
            )
        )
    }
}