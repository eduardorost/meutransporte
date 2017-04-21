import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { AuthService } from './auth-service';

@Injectable()
export class EmpresaService {

  private apiUrl = 'http://192.168.56.1:9000/v1/api';

  constructor(public http: Http, public authService: AuthService) {
  }

  empresasAprovar() {
    return this.http.get(this.apiUrl + '/empresas/aprovar', { headers: this.authService.getHeaderToken() })
      .map(res => res.json());
  }

  removerEmpresa(id) {
    return Observable.create(observer => {
      this.http.delete(this.apiUrl + '/empresas/' + id, { headers: this.authService.getHeaderToken() })
        .subscribe(
        empresa => observer.next(true),
        err => observer.next(false),
        () => observer.complete()
        );
    });
  }

  aprovarEmpresa(id) {
    return Observable.create(observer => {
      this.http.post(this.apiUrl + '/empresas/'+id+'/aprovar', null, { headers: this.authService.getHeaderToken() })
        .map(res => res.json())
        .subscribe(
        empresa => observer.next(true, empresa),
        err => observer.next(false),
        () => observer.complete()
        );
    });
  }

}
