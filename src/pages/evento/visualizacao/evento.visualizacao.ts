import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { EventoCadastroPage } from '../cadastro/evento.cadastro';

import { EventoService } from '../../../providers/evento-service'

@Component({
  selector: 'page-evento-visualizacao',
  templateUrl: 'evento.visualizacao.html'
})
export class EventoVisualizacaoPage {
  eventos;

  constructor(public navCtrl: NavController, private eventoService: EventoService) {
    this.eventoService.eventos().subscribe(eventos => this.eventos = eventos);
  }

  public cadastrarEvento() {
    this.navCtrl.push(EventoCadastroPage);
  }

}
