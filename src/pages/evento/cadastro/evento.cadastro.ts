import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';
import { EventoService } from '../../../providers/evento-service';

@Component({
  selector: 'page-evento-cadastro',
  templateUrl: 'evento.cadastro.html'
})
export class EventoCadastroPage {

  constructor(public navCtrl: NavController, public eventoService: EventoService, private alertCtrl: AlertController) {

  }

  createSuccess = false;
  evento = { nome: '', descricao: '', link: '', data: '', tipo: '', endereco: { cep: '', logradouro: '' }, cidade: { nome: '', uf: 'RS' } };

  cadastrar() {
    this.eventoService.cadastrarEvento(this.evento).subscribe((success, evento) => {
      if (success) {
        this.createSuccess = true;
        this.showPopup("Successo", "Evento cadastrado com sucesso.");
      } else {
        this.showPopup("Erro", "Erro ao salvar evento.");        
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
              this.navCtrl.pop();
            }
          }
        }
      ]
    });
    alert.present();
  }

}
