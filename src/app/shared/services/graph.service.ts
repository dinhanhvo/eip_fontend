import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class GraphService {
  constructor(private http: HttpClient) {
  }
  getGraphTypes(): Observable<any> {
    return this.http.get<any>('assets/data/graph.json');
  }
}