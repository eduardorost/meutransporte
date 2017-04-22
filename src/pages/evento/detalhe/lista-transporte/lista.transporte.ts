import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ViewController, ActionSheetController, Platform } from 'ionic-angular';

import { EventoService } from '../../../../providers/evento-service';
import { AuthService } from '../../../../providers/auth-service';

@Component({
  selector: 'page-lista-transporte',
  templateUrl: 'lista.transporte.html'
})
export class ListaTransporteEventoPage {

  evento;
  usuario;
  vinculadoEvento;
  registerSuccess = false;

  constructor(public navCtrl: NavController, 
  public params: NavParams, 
  public eventoService: EventoService, 
  public authService: AuthService, 
  private alertCtrl: AlertController,
  public platform: Platform,
  public actionSheetCtrl: ActionSheetController,
  public viewCtrl: ViewController) {
    this.evento = params.get("evento");
    this.usuario = this.authService.getUsuario();
    this.vinculadoEvento = this.evento.transportes.filter((transporte) => transporte.vinculoUsuarioLogado).length > 0;
  }

  acaoTransporte(transporte) {
    if(this.usuario.pessoa)
      this.registrarPessoaEventoTransporte(transporte)
    else if (this.usuario.empresa.id == transporte.empresa.id) 
      this.actionSheet(transporte).present();

  }

  actionSheet(transporte) {
    return this.actionSheetCtrl.create({
      title: 'Ações',
      buttons: [
        {
          text: 'Deletar',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.removerTransporte(transporte.id);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
          }
        }
      ]
    });
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

  removerTransporte(id) {
    this.eventoService.removerTransporte(id).subscribe((success) => {
      if (success) {
        this.registerSuccess = true;
        this.showPopup("Successo", "Transporte removido com sucesso.");

        this.evento.transportes = this.evento.transportes.filter(transporte => transporte.id !== id);

        this.evento.transportes.forEach(tr => tr.vinculoUsuarioLogado = false);
      } else {
        this.showPopup("Erro", "Erro ao remover transporte.");
      }
    },
      error => {
        this.showPopup("Erro", error);
      });
  }

  removerUsuarioTransporte(evento) {
    this.eventoService.removerUsuarioTransporte(evento).subscribe((success) => {
      if (success) {
        this.registerSuccess = true;
        this.showPopup("Successo", "Alteração efetuada com sucesso.");

        this.evento.transportes.forEach(tr => tr.vinculoUsuarioLogado = false);
      } else {
        this.showPopup("Erro", "Erro ao efetuar alteração.");
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
