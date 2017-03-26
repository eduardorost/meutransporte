import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { AuthService } from './auth-service';

@Injectable()
export class EventoService {

  private apiUrl = 'http://192.168.0.103:9000/v1/api';

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

}
