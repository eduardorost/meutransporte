import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';
import { ApiService } from './api-service';
import 'rxjs/add/operator/map';

import { AuthService } from './auth-service';

@Injectable()
export class EmpresaService {

  constructor(private authService: AuthService, private apiService: ApiService) {
  }

  empresasAprovar() {
    return this.apiService.get('/empresas/aprovar', { headers: this.authService.getHeaderToken() }).map(res => res.json());
  }

  removerEmpresa(id) {
    return Observable.create(observer => {
      this.apiService.delete('/empresas/' + id, { headers: this.authService.getHeaderToken() })
        .subscribe(
        res => observer.next(true),
        err => observer.next(false),
        () => observer.complete()
        );
    });
  }

  aprovarEmpresa(id) {
    return Observable.create(observer => {
      this.apiService.post('/empresas/' + id + '/aprovar', null, { headers: this.authService.getHeaderToken() })
        .map(res => res.json())
        .subscribe(
        empresa => observer.next(true, empresa),
        err => observer.next(false),
        () => observer.complete()
        );
    });
  }

}
