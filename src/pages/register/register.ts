import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
 
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  createSuccess = false;
  userType = 'pf';
  user = { nome: '', cpf: '', telefone: '', email: '', password: '', confPassword: '' };
  empresa = { nome: '', cnpj: '', recefitur: '', telefone: '', email: '', password: '', confPassword: '' };
 
  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController) {}
 
  public register() {
    if(this.user.password != this.user.confPassword) {
      this.showPopup("Erro", "Senha não confere com sua confirmação.");
      return;
    }

    this.auth.register(this.user).subscribe(success => {
      if (success) {
        this.createSuccess = true;
          this.showPopup("Successo", "Conta criada com sucesso.");
      } else {
        this.showPopup("Erro", "Problema ao criar conta.");
      }
    },
    error => {
      this.showPopup("Erro", error);
    });
  }
 
  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
       {
         text: 'OK',
         handler: data => {
           if (this.createSuccess) {
             this.nav.popToRoot();
           }
         }
       }
     ]
    });
    alert.present();
  }
}