import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AppStoreService, AppStore } from './app-store.service';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  serviceName = '';
  options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  user: User = {}

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
    const loginUrl = this.appStore.getData(AppStore.PROFILE, {}).api + this.serviceName + '/auth/signin';
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
          this.user = data;
          //console.log('got response data', data);
        },
        error => {
          //console.log('login error', error);
        }
      )
    );
  }

  public addUser(user: User): Observable<any> {

    return this.signUp(user.name, user.email, user.username, user.password, user.serialWeigher);
  }

  public signUp(name: string, email: string, username: string, password: string, serialWeigher: string): Observable<any> {
    const loginUrl = this.appStore.getData(AppStore.PROFILE, {}).api  + this.serviceName + '/auth/signup';
    console.log('Signup using API url: ' + loginUrl);
    const body = {
      name: name,
      email: email,
      username: username,
      password: password,
      serialWeigher: serialWeigher
      // language: language
    };

    return this.http.post(loginUrl, body, this.options).pipe(
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
    let url = this.appStore.getData(AppStore.PROFILE, {}).api  + this.serviceName + '/me' + `?token=${token}`;
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

  public getMe(): Observable<any> {
    let token = this.appStore.getAuth()['token'];
    let url = this.appStore.getData(AppStore.PROFILE, {}).api  + this.serviceName + '/auth/me' + `?token=${token}`;
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
              this.user = data;
            },
            error => {
              //console.log('session validation error', error);
            }
        )
    );
  }

  public getAllUser(): Observable<any> {
    let token = this.appStore.getAuth()['token'];
    let url = this.appStore.getData(AppStore.PROFILE, {}).api  + this.serviceName + '/users' + `?token=${token}`;
    return this.http.get(url, this.options).pipe(
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
  
  getCurrentUser(): User {
    return this.user;
  }

  public changeUser(user: User): Observable<any> {
    let url = this.appStore.getData(AppStore.PROFILE, {}).api + '/auth/user/' + user.id + '/change?serialWeigher=' + user.serialWeigher;
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

  public updateUser(user: User): Observable<any> {
    let url = this.appStore.getData(AppStore.PROFILE, {}).api + '/user';
    let body = {
      user: user
    };
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put(url, user, options).pipe(
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

  deleteUser(id): Observable<any> {
    console.log('  delete user: ', id);
    const url = this.appStore.getData(AppStore.PROFILE, {}).api + this.serviceName + '/user?id=' + id;
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
