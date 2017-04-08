import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { EventoCadastroPage } from '../cadastro/evento.cadastro';
import { EventoDetalhePage } from '../detalhe/evento.detalhe';

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

  public detalheEvento(evento) {
    this.navCtrl.push(EventoDetalhePage,  { evento: evento })
  }

}
