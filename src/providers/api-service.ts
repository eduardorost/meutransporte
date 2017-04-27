import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LoginPage } from '../pages/login/login';
import { App, NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { Http } from '@angular/http';
import { AuthService } from './auth-service'

@Injectable()
export class ApiService {
  loading: Loading;
  private apiUrl = 'https://meutransporte-api.herokuapp.com/v1/api';

  constructor(private http: Http, private authService: AuthService, private app: App, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {

  }

  public login(credentials) {
    if (credentials.username === null || credentials.password === null) {
      return Observable.throw("é obrigatório inserir as credenciais.");
    } else {
      return Observable.create(observer => {
        this.get('/login', { headers: this.authService.getHeaderBasicAuth(credentials) })
          .subscribe(
          res => {
            this.authService.saveSession(res.headers.get("x-auth-token"));
            this.authService.saveUsuario(res.text());
            observer.next({ allowed: true });
          },
          err => observer.next({ allowed: false, message: err.json().message }),
          () => observer.complete()
          );
      });
    }
  }

  public get(path, options?) {
    this.showLoading()
    return Observable.create(observer => {
      this.http.get(this.apiUrl + path, options)
        .subscribe(
        res => observer.next(res),
        err => {
          if (err.status == 401) {
            this.showPopup("Erro", "Sua sessão expirou.");
            return;
          }

          observer.next(err);
        },
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
        err => {
          if (err.status == 401)
          if (err.status == 401) {
            this.showPopup("Erro", "Sua sessão expirou.");
            return;
          }

          observer.next(err);
        },
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
        err => {
          if (err.status == 401) {
            this.showPopup("Erro", "Sua sessão expirou.");
            return;
          }

          observer.next(err);
        },
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
        err => {
          if (err.status == 401) {
            this.showPopup("Erro", "Sua sessão expirou.");
            return;
          }

          observer.next(err);
        },
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

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: () => this.logout()
        }
      ]
    });

    alert.present();
  }

  logout() {
    this.loading.dismissAll();
    localStorage.removeItem('X-AUTH-TOKEN');
    localStorage.removeItem('USUARIO');
    this.app.getActiveNav().setRoot(LoginPage);
  }

}