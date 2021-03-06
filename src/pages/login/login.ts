import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { ApiService } from '../../providers/api-service';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  registerCredentials = { username: '', password: '' };

  constructor(private nav: NavController, private api: ApiService, private auth: AuthService, private alertCtrl: AlertController) {

  }

  public createAccount(event) {
    event.preventDefault();
    this.nav.push(RegisterPage);
  }

  public login(event) {
    event.preventDefault();
    this.api.login(this.registerCredentials).subscribe(res => {
      if (res.allowed) {
        this.nav.setRoot(HomePage)
      } else {
        this.showError(res.message);
      }
    },
      error => {
        this.showError(error);
      });
  }

  showError(text) {
    let alert = this.alertCtrl.create({
      title: 'Erro',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}