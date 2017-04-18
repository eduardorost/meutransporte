import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { EventoCadastroPage } from '../cadastro/evento.cadastro';
import { EventoDetalhePage } from '../detalhe/evento.detalhe';
import { LoginPage } from '../../login/login';

import { EventoService } from '../../../providers/evento-service'
import { AuthService } from '../../../providers/auth-service';

@Component({
  selector: 'page-evento-visualizacao',
  templateUrl: 'evento.visualizacao.html'
})
export class EventoVisualizacaoPage {
  eventos;

  constructor(public navCtrl: NavController, private eventoService: EventoService, private auth: AuthService) {
    this.eventoService.eventos().subscribe(eventos => this.eventos = eventos);
  }

  public cadastrarEvento() {
    this.navCtrl.push(EventoCadastroPage);
  }

  public detalheEvento(evento) {
    this.navCtrl.push(EventoDetalhePage,  { evento: evento, canEdit: true })
  }

  public logout() {
    this.auth.logout().subscribe(succ => {
      this.navCtrl.setRoot(LoginPage)
    });
  }

}
