import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { AuthService } from './auth-service';

@Injectable()
export class EventoService {

  private apiUrl = 'http://192.168.56.1:9000/v1/api';

  constructor(public http: Http, public authService: AuthService) {
  }

  eventos() {
    return this.http.get(this.apiUrl + '/eventos', { headers: this.authService.getHeaderToken() })
      .map(res => res.json());

  }

  cadastrarEvento(evento) {
    return Observable.create(observer => {
      this.http.post(this.apiUrl + '/eventos', evento, { headers: this.authService.getHeaderToken() })
        .map(res => res.json())
        .subscribe(
        evento => observer.next(true, evento),
        err => observer.next(false),
        () => observer.complete()
        );
    });
  }

  alterarEvento(evento) {
    return Observable.create(observer => {
      this.http.put(this.apiUrl + '/eventos/', evento, { headers: this.authService.getHeaderToken() })
        .map(res => res.json())
        .subscribe(
        evento => observer.next(true, evento),
        err => observer.next(false),
        () => observer.complete()
        );
    });
  }

  registrarEmpresaEvento(evento, veiculo) {
    return Observable.create(observer => {
      this.http.post(this.apiUrl + '/eventos/' + evento.id + '/transportes', { veiculo: veiculo }, { headers: this.authService.getHeaderToken() })
        .map(res => res.json())
        .subscribe(
        evento => observer.next(true),
        err => observer.next(false),
        () => observer.complete()
        );
    });
  }

  registrarPessoaEventoTransporte(transporte) {
    return Observable.create(observer => {
      this.http.post(this.apiUrl + '/eventos/transportes/'+transporte.id+'/vincular/pessoa', null, { headers: this.authService.getHeaderToken() })
        .map(res => res.json())
        .subscribe(
        evento => observer.next(true),
        err => observer.next(false),
        () => observer.complete()
        );
    });
  }

}
