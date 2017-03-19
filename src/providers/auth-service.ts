import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Usuario } from '../models/usuario';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  private apiUrl = 'http://localhost:9000/v1/api';

  constructor(private http: Http) { }

  public login(credentials) {
    if (credentials.username === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        this.http.get(this.apiUrl + '/login', { headers: this.getHeaderBasicAuth(credentials) }).map((res: Response) => res.json())
          .subscribe(
            data => { this.saveSession(data.session); observer.next(true); },
            err => observer.next(false),
            () => observer.complete()
          );
      });
    }
  }

  private saveSession(session) {
    if (session) {
      localStorage.setItem('X-AUTH-TOKEN', session);
    }
  }

  public getSession() : string {
      return localStorage.getItem('X-AUTH-TOKEN');
  }

  private getHeaderBasicAuth(credentials) : Headers {
    let headers = new Headers();
    headers.append("Authorization", "Basic " + btoa(credentials.username + ":" + credentials.password));
    return headers;
  }

  private getHeaderToken() : Headers {
    let headers = new Headers();
    headers.append("X-AUTH-TOKEN", this.getSession());
    return headers;
  }

  public register(user) {
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
  }

  public getUserInfo() : Observable<Usuario> {
    return this.http.get(this.apiUrl + '/login/usuario', { headers: this.getHeaderToken() }).map((res: Response) => res.json());
  }

  public logout() {
    return Observable.create(observer => {
      localStorage.removeItem('X-AUTH-TOKEN');
      observer.next(true);
      observer.complete();
    });
  }
}