import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';
import { ApiService } from './api-service';

import { Usuario } from '../models/usuario';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor() { }

  public getSession() : string {
      return localStorage.getItem('X-AUTH-TOKEN');
  }

  public register(user) {
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
  }

  public getUsuario() : Usuario {
    return JSON.parse(localStorage.getItem('USUARIO'));
  }

  public logout() {
    return Observable.create(observer => {
      localStorage.removeItem('X-AUTH-TOKEN');
      localStorage.removeItem('USUARIO');
      observer.next(true);
      observer.complete();
    });
  }

  public getHeaderToken() : Headers {
    let headers = new Headers();
    headers.append("X-AUTH-TOKEN", this.getSession());
    return headers;
  }

  public getHeaderBasicAuth(credentials) : Headers {
    let headers = new Headers();
    headers.append("Authorization", "Basic " + btoa(credentials.username + ":" + credentials.password));
    return headers;
  }

  public saveSession(session) {
    if (session) {
      localStorage.setItem('X-AUTH-TOKEN', session);
    }
  }

  public saveUsuario(usuario) {
    localStorage.setItem('USUARIO', usuario);
  }

}