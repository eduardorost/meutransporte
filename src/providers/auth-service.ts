import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';
import { ApiService } from './api-service';

import { Usuario } from '../models/usuario';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(private apiService: ApiService) { }

  public login(credentials) {
    if (credentials.username === null || credentials.password === null) {
      return Observable.throw("é obrigatório inserir as credenciais.");
    } else {
      return Observable.create(observer => {
        this.apiService.get('/login', { headers: this.getHeaderBasicAuth(credentials) })
          .subscribe(
            res => {
              this.saveSession(res.headers.get("x-auth-token"));
              this.saveUsuario(res.text());
              observer.next({allowed: true}); 
            },
            err => observer.next({allowed: false, message: err.json().message}),
            () => observer.complete()
          );
      });
    }
  }

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

  private getHeaderBasicAuth(credentials) : Headers {
    let headers = new Headers();
    headers.append("Authorization", "Basic " + btoa(credentials.username + ":" + credentials.password));
    return headers;
  }

  private saveSession(session) {
    if (session) {
      localStorage.setItem('X-AUTH-TOKEN', session);
    }
  }

  private saveUsuario(usuario) {
    localStorage.setItem('USUARIO', usuario);
  }

}