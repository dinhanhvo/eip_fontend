import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AppStoreService, AppStore } from './app-store.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient, private appStore: AppStoreService) {}

  /**
     * Call rest api /login to perform login to AD Dashboard
     * 
     * @param user username
     * @param credentials password
     * @return an `Observable` object of login response. 
     * Example sucess login response:
     * {
     *   "data": {
     *     "token": "token-for-using-during-session"
     *   },
     *   "errors": [
     *   ]
     * }
     * Example failed login response:
     * {
     *   "data": {},
     *   "errors": [
     *     {
     *       "code": "API-0001",
             "userMessage": "User [imxdb Invalid] is not found",
             "internalMessage": "user not found: imxdb Invalid"
     *     }
     *   ]
     * }
     */
  public login(user: string, credentials: string, language): Observable<any> {
    const loginUrl = this.appStore.getData(AppStore.PROFILE, {}).api + '/auth/signin';
    console.log('Login to Dashboard using API url: ' + loginUrl);
    let body = {
      usernameOrEmail: user,
      password: credentials,
      language: language
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(loginUrl, body, options).pipe(
      tap(
        data => {
          //console.log('got response data', data);
        },
        error => {
          //console.log('login error', error);
        }
      )
    );
  }

  public signUp(name: string, email: string, username: string, password: string): Observable<any> {
    const loginUrl = this.appStore.getData(AppStore.PROFILE, {}).api + '/auth/signup';
    console.log('Login to Dashboard using API url: ' + loginUrl);
    const body = {
      name: name,
      email: email,
      username: username,
      password: password
      // language: language
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(loginUrl, body, options).pipe(
      tap(
        data => {
          //console.log('got response data', data);
        },
        error => {
          //console.log('login error', error);
        }
      )
    );
  }

  public validateSession(token: string): Observable<any> {
    let url = this.appStore.getData(AppStore.PROFILE, {}).api + '/me' + `?token=${token}`;
    let body = {};
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(url, body, options).pipe(
      tap(
        data => {
          //console.log('got session data', data);
        },
        error => {
          //console.log('session validation error', error);
        }
      )
    );
  }

  public uploadFile() {
    
  }
}
