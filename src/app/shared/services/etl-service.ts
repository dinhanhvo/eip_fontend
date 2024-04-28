import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BaseService } from './base.service';
import { CommonFunc } from '../utils';

const API_ETL_INFO: string = '/etl-info';

@Injectable({
  providedIn: 'root'
})
export class EtlService {
  constructor(private baseService: BaseService) {}

  public getETlInfo() {
    return this.baseService.getData(API_ETL_INFO).pipe(tap(resp => {}, err => {}));
  }
}
