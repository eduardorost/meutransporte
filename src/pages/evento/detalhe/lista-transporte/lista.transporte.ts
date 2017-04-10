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

  constructor(public navCtrl: NavController, public params: NavParams, public eventoService: EventoService, public authService: AuthService, private alertCtrl: AlertController, public viewCtrl: ViewController) {
    this.evento = params.get("evento");
  }
  
}
