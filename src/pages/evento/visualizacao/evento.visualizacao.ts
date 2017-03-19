import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { EventoCadastroPage } from '../cadastro/evento.cadastro';

@Component({
  selector: 'page-evento-visualizacao',
  templateUrl: 'evento.visualizacao.html'
})
export class EventoVisualizacaoPage {

  constructor(public navCtrl: NavController) {
    
  }

  public cadastrarEvento() {
    this.navCtrl.push(EventoCadastroPage);
  }

}
