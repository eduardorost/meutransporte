import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';
import { ApiService } from './api-service';
import 'rxjs/add/operator/map';

import { AuthService } from './auth-service';

@Injectable()
export class EventoService {

  constructor(public authService: AuthService, private apiService: ApiService) {
  }

  eventos() {
    return this.apiService.get('/eventos', { headers: this.authService.getHeaderToken() })
      .map(res => res.json());
  }

  cadastrarEvento(evento) {
    return Observable.create(observer => {
      this.apiService.post('/eventos', evento, { headers: this.authService.getHeaderToken() })
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
      this.apiService.put('/eventos/', evento, { headers: this.authService.getHeaderToken() })
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
      this.apiService.post('/eventos/' + evento.id + '/transportes', { veiculo: veiculo }, { headers: this.authService.getHeaderToken() })
        .map(res => res.json())
        .subscribe(
        evento => observer.next(true),
        err => observer.next(false),
        () => observer.complete()
        );
    });
  }

  removerTransporte(id) {
    return Observable.create(observer => {
      this.apiService.delete('/eventos/transportes/' + id, { headers: this.authService.getHeaderToken() })
        .subscribe(
        observer.next(true),
        err => observer.next(false),
        () => observer.complete()
        );
    });
  }

  removerUsuarioTransporte(evento) {
    return Observable.create(observer => {
      this.apiService.delete('/eventos/' + evento.id + '/transportes', { headers: this.authService.getHeaderToken() })
        .subscribe(
        observer.next(true),
        err => observer.next(false),
        () => observer.complete()
        );
    });
  }

  registrarPessoaEventoTransporte(transporte) {
    return Observable.create(observer => {
      this.apiService.post('/eventos/transportes/' + transporte.id + '/vincular/pessoa', null, { headers: this.authService.getHeaderToken() })
        .map(res => res.json())
        .subscribe(
        evento => observer.next(true),
        err => observer.next(false),
        () => observer.complete()
        );
    });
  }

}
