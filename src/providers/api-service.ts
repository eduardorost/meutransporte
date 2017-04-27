import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LoadingController, Loading } from 'ionic-angular';
import { Http } from '@angular/http';

@Injectable()
export class ApiService {
  loading: Loading;
  private apiUrl = 'https://meutransporte-api.herokuapp.com/v1/api';

  constructor(private http: Http, private loadingCtrl: LoadingController) { }

  public get(path, options?) {
    this.showLoading()
    return Observable.create(observer => {
      this.http.get(this.apiUrl + path, options)
        .subscribe(
          res => observer.next(res),
          err => observer.next(err), //TODO: VALIDAR 401
          () => {
            this.loading.dismiss();
            observer.complete();
          }
        );
    });
  }

  public post(path, data, options?) {
    this.showLoading()
    return Observable.create(observer => {
      this.http.post(this.apiUrl + path, data, options)
        .subscribe(
          res => observer.next(res),
          err => observer.next(err), //TODO: VALIDAR 401
          () => {
            this.loading.dismiss();
            observer.complete();
          }
        );
    });
  }

  public put(path, data, options?) {
    this.showLoading()
    return Observable.create(observer => {
      this.http.put(this.apiUrl + path, data, options)
        .subscribe(
          res => observer.next(res),
          err => observer.next(err), //TODO: VALIDAR 401
          () => {
            this.loading.dismiss();
            observer.complete();
          }
        );
    });
  }

  public delete(path, options?) {
    this.showLoading()
    return Observable.create(observer => {
      this.http.delete(this.apiUrl + path, options)
        .subscribe(
          res => observer.next(res),
          err => observer.next(err), //TODO: VALIDAR 401
          () => {
            this.loading.dismiss();
            observer.complete();
          }
        );
    });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });
    this.loading.present();
  }

}