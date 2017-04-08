import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Camera } from 'ionic-native'

import { EventoService } from '../../../providers/evento-service';
import { AuthService } from '../../../providers/auth-service';

@Component({
  selector: 'page-evento-detalhe',
  templateUrl: 'evento.detalhe.html'
})
export class EventoDetalhePage {

  evento;
  canEdit;

  constructor(public navCtrl: NavController, public params: NavParams, public eventoService: EventoService, public authService: AuthService, private alertCtrl: AlertController) {
    this.evento = params.get("evento");
    this.canEdit = this.evento.usuario.id == authService.getUsuario().id;
  }

  alterSuccess = false;

  // cadastrar() {
  //   this.eventoService.cadastrarEvento(this.evento).subscribe((success, evento) => {
  //     if (success) {
  //       this.createSuccess = true;
  //       this.showPopup("Successo", "Evento cadastrado com sucesso.");
  //     } else {
  //       this.showPopup("Erro", "Erro ao salvar evento.");
  //     }
  //   },
  //     error => {
  //       this.showPopup("Erro", error);
  //     });
  // }

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

  // showPopup(title, text) {
  //   let alert = this.alertCtrl.create({
  //     title: title,
  //     subTitle: text,
  //     buttons: [
  //       {
  //         text: 'OK',
  //         handler: data => {
  //           if (this.createSuccess) {
  //             this.navCtrl.pop();
  //           }
  //         }
  //       }
  //     ]
  //   });
  //   alert.present();
  // }

}
