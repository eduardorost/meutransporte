import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { UsuarioService } from '../../providers/usuario-service';
 
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  createSuccess = false;
  userType = 'pf';
  pessoa = { cpf: '', email: '', nome: '', telefone: '' };
  empresa = { cnpj: '', email: '', nome: '', telefone: '', recefitur: '', veiculos: [ { capacidade: '',  modelo: '', placa: '' } ] };
  usuario = { empresa: this.empresa, login: '', pessoa: this.pessoa, senha: '', confirmacaoSenha: '', status: true };
 
  constructor(private nav: NavController, private auth: AuthService, private usuarioService: UsuarioService, private alertCtrl: AlertController) {}
 
  public register() {
    if(this.usuario.senha != this.usuario.confirmacaoSenha) {
      this.showPopup("Erro", "Senha não confere com sua confirmação.");
      return;
    }

    this.usuarioService.salvar(this.usuario, this.userType).subscribe(success => {
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