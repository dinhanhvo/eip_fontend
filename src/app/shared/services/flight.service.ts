import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BaseService } from './base.service';
import { CommonFunc } from '../utils/common-func';

const API_HOST: string = 'http://platform.datacom.vn/flights/search/';
const API_GET_FLIGHTS: string = 'flights/search?';

@Injectable({
    providedIn: 'root'
  })
export class FlightService {
  private defaultBody: any;

  constructor(private baseService: BaseService) {}

  flightSearch(flightMD) {
    console.log();
    //http://platform.datacom.vn/flights/search?
    //account=DC10899&password=qghm6t9w&itinerary=0&startPoint=HAN&endPoint=SGN&departDate=01012020&returnDate=01012020&adt=1&chd=0&inf=0&airline=VN&viewmode='false'
    let params = '';
    for (let pr in flightMD) {
        console.log(pr);
        params = params + pr + '=' + flightMD[pr] + '&';
    }
    params = params.substr(0, params.length - 1);
    let url = API_GET_FLIGHTS + params;
    return this.baseService.getData(url, {}).pipe(
      tap(
        resp => {
          console.log('flightSearch ===resp==== ', resp);
        },
        err => {
          console.log('flightSearch ===err==== ', err);
        }
      )
    );
}

//   addDashboard() {
//     return this.baseService.postData(API_ADD_DASHBOAD, {}).pipe(
//       tap(
//         resp => {
//           // console.log('dashboard-service: got widget data', widgetId, resp);
//         },
//         err => {
//           // console.log('dashboard-service: error fetching widget data', widgetId, err);
//         }
//       )
//     );
//   }
}