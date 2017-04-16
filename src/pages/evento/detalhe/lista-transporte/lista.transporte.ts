import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ViewController } from 'ionic-angular';

import { EventoService } from '../../../../providers/evento-service';
import { AuthService } from '../../../../providers/auth-service';

@Component({
  selector: 'page-lista-transporte',
  templateUrl: 'lista.transporte.html'
})
export class ListaTransporteEventoPage {

  evento;
  registerSuccess = false;

  constructor(public navCtrl: NavController, public params: NavParams, public eventoService: EventoService, public authService: AuthService, private alertCtrl: AlertController, public viewCtrl: ViewController) {
    this.evento = params.get("evento");
  }

  registrarPessoaEventoTransporte(transporte) {
    this.eventoService.registrarPessoaEventoTransporte(transporte).subscribe((success) => {
      if (success) {
        this.registerSuccess = true;
        this.showPopup("Successo", "Registro efetuado com sucesso.");

        this.evento.transportes.forEach(tr => {
          if(tr.id == transporte.id)
            tr.vinculoUsuarioLogado = true;
          else
            tr.vinculoUsuarioLogado = false;
        });
      } else {
        this.showPopup("Erro", "Erro ao registrar.");
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
            if (this.registerSuccess) {
              this.viewCtrl.dismiss();
            }
          }
        }
      ]
    });
    alert.present();
  }
  
}
