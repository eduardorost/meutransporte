import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Usuario } from '../models/usuario';
import { AuthService } from './auth-service';

import 'rxjs/add/operator/map';

@Injectable()
export class UsuarioService {
  private apiUrl = 'http://192.168.56.1:9000/v1/api';

  constructor(private http: Http, public authService: AuthService) { }

  eventos(id) {
    return this.http.get(this.apiUrl + '/usuarios/'+ id +'/eventos', { headers: this.authService.getHeaderToken() })
      .map(res => res.json());
  }

  eventosTransporte(id) {
    return this.http.get(this.apiUrl + '/usuarios/'+ id +'/transportes/eventos', { headers: this.authService.getHeaderToken() })
      .map(res => res.json());
  }

  public salvar(usuario, userType) {
    usuario = JSON.parse(JSON.stringify(usuario));;

    if(userType == 'pf') usuario.empresa = null;
    else usuario.pessoa = null;

    return Observable.create(observer => {
      this.http.post(this.apiUrl + '/usuarios', usuario).map((res: Response) => res.json())
                .subscribe(
                  data => observer.next(true),
                  err => observer.next(false),
                  () => observer.complete()
                );
      });
  }
}