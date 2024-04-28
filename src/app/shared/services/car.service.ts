import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  constructor(private http: HttpClient) { }

  getCars(): Observable<any> {
    return this.http.get<any>('assets/data/cars-small.json').pipe(
      tap(
        data => {
          console.log('car-service: got response data', data.data);
        },
        error => {
          console.log('car-service: error', error);
        }
      )
    );
  }
}
