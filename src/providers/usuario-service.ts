import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { Usuario } from '../models/usuario';
import { AuthService } from './auth-service';
import { ApiService } from './api-service';

import 'rxjs/add/operator/map';

@Injectable()
export class UsuarioService {

  constructor(private authService: AuthService, private apiService: ApiService) {
  }

  eventos(id) {
    return this.apiService.get('/usuarios/' + id + '/eventos', { headers: this.authService.getHeaderToken() }).map(res => res.json());
  }

  eventosTransporte(id) {
    return this.apiService.get('/usuarios/' + id + '/transportes/eventos', { headers: this.authService.getHeaderToken() }).map(res => res.json());
  }

  public salvar(usuario, userType) {
    usuario = JSON.parse(JSON.stringify(usuario));;

    if (userType == 'pf') usuario.empresa = null;
    else usuario.pessoa = null;

    return Observable.create(observer => {
      this.apiService.post('/usuarios', usuario)
        .map(res => res.json())
        .subscribe(
          data => observer.next(true),
          err => observer.next(false),
          () => observer.complete()
        );
    });
  }
}