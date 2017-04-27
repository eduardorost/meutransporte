import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { Camera } from 'ionic-native'

import { EventoService } from '../../../providers/evento-service';
import { AuthService } from '../../../providers/auth-service';
import { SelecionarVeiculoPage } from './selecionar-veiculo/selecionar.veiculo';
import { ListaTransporteEventoPage } from './lista-transporte/lista.transporte';

@Component({
  selector: 'page-evento-detalhe',
  templateUrl: 'evento.detalhe.html'
})
export class EventoDetalhePage {

  evento;
  canEdit;
  canRegisterCompany;
  alterSuccess = false;
  usuario;
  maskCep = [/[1-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]

  constructor(public navCtrl: NavController, public params: NavParams, public eventoService: EventoService, public authService: AuthService, private alertCtrl: AlertController, public modalCtrl: ModalController) {
    this.evento = params.get("evento");
    this.usuario = authService.getUsuario();
    this.canEdit = params.get("canEdit") && (this.evento.usuario && this.evento.usuario.id == this.usuario.id);
    this.canRegisterCompany = this.usuario.empresa != null;
  }

  editar() {
    this.eventoService.alterarEvento(this.evento).subscribe((success, evento) => {
      if (success) {
        this.alterSuccess = true;
        this.showPopup("Successo", "Evento alterado com sucesso.");
      } else {
        this.showPopup("Erro", "Erro ao alterar evento.");
      }
    },
      error => {
        this.showPopup("Erro", error);
      });
  }

  listaTransportes() {
    this.navCtrl.push(ListaTransporteEventoPage,  { evento: this.evento })
  }

  selecionarVeiculo() {
      let modal = this.modalCtrl.create(SelecionarVeiculoPage, { "evento": this.evento });
      modal.present();
  }

  selecionarFoto(event) {
    event.preventDefault();

    Camera.getPicture({
      sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: Camera.DestinationType.DATA_URL
    }).then((imageData) => {
      this.evento.foto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
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
            if (this.alterSuccess) {
              this.navCtrl.pop();
            }
          }
        }
      ]
    });
    alert.present();
  }

}
